import React from 'react';
import { Link } from 'react-router-dom';
import Task from '../../Components/Task/Task';
import DebugLog from '../../Utils/DebugLog';
import './Backlog.css'

export default class Backlog extends React.Component {
  constructor(props){
    super(props);
    this.onClickAddTask = this.onClickAddTask.bind(this);
  }

  onClickAddTask(){
    this.props.onClickAddTask();
  }

  render(){
    const tasks = this.props.tasks;

    let ren;
    if (tasks && tasks.length > 0){
      ren = tasks.map((task) =>
        <Task task={task}/>
      )
    } else {
      ren = <Task task={null} onClick={this.onClickAddTask}/>
    }
    return (
      <div className="mh4-ns Tasks">
        <header className="fn pr4-ns">
          <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bw2">
            Backlog
          </h1>
          <h2 className="f3 mid-gray lh-title">
          </h2>
        </header>

        <ul className="list pl0 mt0 measure">
          <li onClick={this.onClickAddTask}
            className="flex items-center   ph0-l b--black-10 dim Task">
            <i className="fa fa-plus w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
            <div className="pl3 flex-auto">
              <span className="f6 db black-70">Add a new task</span>
            </div>
            <div>
            </div>
          </li>
        </ul>

        <h2 className="f3 mid-gray lh-title">Tasks not yet assigned to a sprint</h2>
        <time className="f6 ttu tracked gray">Drag & drop to add task to sprint</time>

        <ul className="list pl0 mt3 measure">
          {ren}

          {/* TEMPLATE FOR TASK
            <li className="flex items-center  ph0-l bb b--black-10 dim Task">
              <i className="fa fa-edit w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
              <div className="pl3 flex-auto">
                <span className="f6 db black-70">Do laundry</span>
                <span className="f6 db black-70">Small</span>
              </div>
              <div>
                <a href="tel:" className="f6 link blue hover-dark-gray">Due 15-Dec-2017</a>
              </div>
            </li>
            */}
        </ul>
      </div>
    )
  }
}
