export default class Project {
	constructor(id, sprints, backlog, timezone) {
		this.id = id;
		this.sprints = sprints;
		this.backlog = [];
		this.timezone = timezone;
	}
}
