import React from 'react';
import { Link } from 'react-router-dom';
import DebugLog from '../../Utils/DebugLog';
import { switchTheme } from '../../Utils/Themes';
import './Task.css'

export default class Task extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  render(){
    DebugLog('Task', this.props);
    let task = this.props.task;
    let ren;
    if (task){
      ren =
        <li className="flex items-center ph0-l bb b--black-10 dim Task">
          <i className="fa fa-edit w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
          <div className="pl3 flex-auto">
            <span className="f6 db black-70">{task.title}</span>
            <span className="f6 db black-70">{task.size}</span>
          </div>
          <div>
            <a className="f6 link blue hover-dark-gray">{task.dueDate}</a>
          </div>
        </li>
    } else { //empty state
      ren =
        <li onClick={this.props.onClick} className="flex items-center ph0-l b--black-10 dim Task Task__AnimatedBackground--EmptyState bg-washed-green">
          <i className="fa fa-edit w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
          <div className="pl3 flex-auto">
            <span className="f6 db black-70">{this.props.caption}</span>
            <span className="f6 db black-70"></span>
          </div>
          <div>
            <a className="f6 link blue hover-dark-gray">{this.props.cta}</a>
          </div>
        </li>
    }
    return (
      <div>
        {ren}
      </div>
    )
  }
}
