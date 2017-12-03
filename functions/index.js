const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const path = require('path');
// const Project = require('./Models/Project');
// const Sprint = require('./Models/Sprint');
// const User = require('./Models/User');

var firebaseConfig = functions.config().firebase;
firebaseConfig.credential = admin.credential.cert(path.join(__dirname, 'vitalarium.json'));
admin.initializeApp(firebaseConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getProjectFromDb = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const projectId = request.query.projectId;
    const db = admin.database();
    db.ref(`projects/${projectId}`).once('value').then((projectSnap) => {
      // DebugLog('projectSnap.val()', projectSnap.val());
      let project = projectSnap.val();
      let projectCalls = [];
      if (project && Array.isArray(project.sprints)) {
        // DebugLog('project.sprints',project.sprints);
        projectCalls.push(getSprintsFromDb(project.sprints));
      }
      if (project && Array.isArray(project.backlog)) {
        // DebugLog('project.backlog',project.backlog);
        projectCalls.push(getTasksFromDb(project.backlog));
      }
      Promise.all(projectCalls).then((projectResults) => {
        let sprints = projectResults[0];
        let backlog = projectResults[1] || [];
        project.sprints = sprints;
        project.backlog = backlog;
        project = preprocessProjectDates(project);
        let obj = {
          project: project,
          success: true,
        };
        response.send(obj);
      });
    }).catch((err) => {
      let obj = {
        success: false,
        err: err,
      };
      response.send(obj);
    });
  });
});

exports.initializeUserObjectsInDb = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const redirectResult = request.body.redirectResult;
    const db = admin.database();
    let firstSprintRef = db.ref('sprints/').push();
    let secondSprintRef = db.ref('sprints/').push();
    let projectRef = db.ref('projects/').push();

    let firstSprint = Sprint(firstSprintRef.key, [], Date.now(), new Date().setDate(new Date().getDate() + 14));
    let secondSprint = Sprint(secondSprintRef.key, [], new Date().setDate(new Date().getDate() + 14), new Date().setDate(new Date().getDate() + 28));
    let project = Project(projectRef.key, [firstSprintRef.key, secondSprintRef.key], [], Intl.DateTimeFormat().resolvedOptions().timeZone);
    let user = User(redirectResult.user.uid,
      redirectResult.user.displayName,
      redirectResult.user.email,
      redirectResult.user.photoURL,
      redirectResult.additionalUserInfo && redirectResult.additionalUserInfo.providerId,
      [projectRef.key]);

    let calls = [
      db.ref('sprints/' + firstSprintRef.key).set(firstSprint),
      db.ref('sprints/' + secondSprintRef.key).set(secondSprint),
      db.ref('projects/' + projectRef.key).set(project),
      db.ref('users/' + user.id).set(user)
    ];
    Promise.all(calls).then((results) => {
      project.sprints = [firstSprint, secondSprint];
      project = preprocessProjectDates(project);
      let obj = {
        user: user,
        project: project,
        success: true,
      };
      response.send(obj);
    }).catch((err) => {
      let obj = {
        success: false,
        err: err,
      };
      response.send(obj);
    });
  });
});

exports.createTask = functions.https.onRequest((request, response)=>{
  cors(request, response, () => {
    let task = request.body.task;
    const db = admin.database();
    const taskRef = db.ref('tasks/').push();
    task.id = taskRef.key;
    if (task.sprint && task.sprint !== 'backlog') { //save to sprint
      db.ref('sprints/' + task.sprint).once('value').then((sprintSnap) => {
        let destSprint = sprintSnap.val();
        if (destSprint) {
          destSprint.tasks = Array.isArray(destSprint.tasks) ? destSprint.tasks : [];
          destSprint.tasks.push(taskRef.key);
          let sprintCalls = [];
          sprintCalls.push(db.ref(`tasks/${taskRef.key}`).set(task));
          sprintCalls.push(db.ref(`sprints/'${task.sprint}`).set(destSprint));
          Promise.all(sprintCalls).then((responses) => {
            let obj = {
              task: task,
              success: true,
            };
            response.send(obj);
          }).catch((err) => {
            let obj = {
              err,
              success: false,
              task,
            }
            response.send(obj);
          });
        } else {
          let obj = {
            err: 'Destination sprint does not exist.',
            success: false,
            task,
          }
          response.send(obj);
        }
      }).catch((err) => {
        let obj = {
          success: false,
          err,
          task,
        }
        response.send(obj);
      });
    } else if (task.project) { //save to backlog since no sprint specified
      db.ref('projects/' + task.project).once('value').then((projectSnap) => {
        let destProject = projectSnap.val();
        if (destProject) {
          destProject.backlog = Array.isArray(destProject.backlog) ? destProject.backlog : [];
          destProject.backlog.push(taskRef.key);
          let projectCalls = [];
          projectCalls.push(db.ref('tasks/' + taskRef.key).set(task));
          projectCalls.push(db.ref('projects/' + task.project).set(destProject));
          Promise.all(projectCalls).then((responses) => {
            let obj = {
              task: task,
              success: true,
            };
            response.send(obj);
          }).catch((err) => {
            let obj = {
              success: false,
              err,
              task,
            }
            response.send(obj);
          });
        } else {
          let obj = {
            err: 'Destination sprint does not exist.',
            success: false,
            task,
          }
          response.send(obj);
        }
      }).catch((err) => {
        let obj = {
          success: false,
          err,
          task,
        }
        response.send(obj);
      });
    }
  });
});

const getTasksFromDb = (taskList) => {
  return new Promise((resolve, reject) => {
    let calls = [];
    let db = admin.database();
    for (let i = 0; i < taskList.length; i += 1) {
      calls.push(db.ref('tasks/' + taskList[i]).once('value'));
    }
    Promise.all(calls).then((results) => {
      let tasks = [];
      for (let i = 0; i < results.length; i += 1) {
        let task = results[i].val();
        tasks.push(task);
      }
      tasks.sort(taskComparatorDesc);
      resolve(tasks);
    }).catch((err) => {
      reject(tasks);
    });
  });
}

const getSprintsFromDb = (sprintIds) => {
  return new Promise((resolve, reject) => {
    let db = admin.database();
    let sprintCalls = [];
    for (let i = 0; i < sprintIds.length; i += 1) {
      sprintCalls.push(db.ref('sprints/' + sprintIds[i]).once('value'));
    }
    Promise.all(sprintCalls).then((sprintResponses) => {
      let sprints = [];
      for (let i = 0; i < sprintResponses.length; i += 1) {
        let sprint = sprintResponses[i].val();
        if (Array.isArray(sprint.tasks)) {
          let taskCalls = [];
          for (let j = 0; j < sprint.tasks.length; j += 1) {
            // DebugLog('sprint.tasks[j]',sprint.tasks[j]);
            taskCalls.push(db.ref('tasks/' + sprint.tasks[j]).once('value'));
          }
          Promise.all(taskCalls).then((taskResults) => {
            let tasks = [];
            for (let k = 0; k < taskResults.length; k += 1) {
              let task = taskResults[k].val();
              tasks.push(taskResults[k].val());
            }
            tasks.sort(taskComparatorDesc);
            sprint.tasks = tasks;
            sprints.push(sprint);
            if (sprints.length === sprintIds.length) {
              sprints.sort(sprintComparatorDesc);
              const now = Date.now();
              for (let l = 0; l < sprints.length; l += 1){
                const daysRemainingTilEndOfSprint = sprints[l].endDate - now;
                sprints[l].daysRemainingTilEndOfSprint = daysRemainingTilEndOfSprint;
              }
              resolve(sprints);
            }
          });
        } else {
          sprint.tasks = [];
          sprints.push(sprint);
          if (sprints.length === sprintIds.length) {
            sprints.sort(sprintComparatorDesc);
            const now = Date.now();
            for (let l = 0; l < sprints.length; l += 1){
              const daysRemainingTilEndOfSprint = sprints[l].endDate - now;
              sprints[l].daysRemainingTilEndOfSprint = daysRemainingTilEndOfSprint;
            }
            resolve(sprints);
          }
        }
      }
    });
  });
}

const sprintComparatorDesc = (a, b) => {
  return (a.startDate < b.startDate) ? -1 : (a.startDate > b.startDate) ? 1 : 0;
}

const taskComparatorDesc = (a, b) => {
  return (a.createdOn < b.createdOn) ? 1 : a.createdOn > b.createdOn ? -1 : 0;
}

const preprocessProjectDates = (project) => {
  if (!project.sprints) //no sprints
    return project;

  for (let i = 0; i < project.sprints.length; i += 1) {
    project.sprints[i].startDate = convertDateMillsecondsToHyphenatedMonthName(project.sprints[i].startDate)
    project.sprints[i].endDate = convertDateMillsecondsToHyphenatedMonthName(project.sprints[i].endDate)
  }

  return project;
}

const convertDateMillsecondsToHyphenatedMonthName = (milliseconds) => {
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var d = new Date(milliseconds);
  return d.getUTCDate() + '-' + (monthNames[d.getUTCMonth()]) + '-' + d.getUTCFullYear();
}

function Sprint(id, tasks, startDate, endDate) {
	return {
		id: id,
		tasks: tasks,
		startDate: startDate,
		endDate: endDate
	}
}

function User(id, displayName, email, photoUrl, providerId, projects) {
	return {
		id: id,
		displayName: displayName,
		email: email,
		photoUrl: photoUrl,
		providerId: providerId,
		projects: projects
	}
}

function Project(id, sprints, backlog, timezone) {
	return {
		id: id,
		sprints: sprints,
		backlog: [],
		timezone: timezone
	}
}
