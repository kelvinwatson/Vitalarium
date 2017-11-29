import React from 'react';
import { Link } from 'react-router-dom';
import DebugLog from '../../Utils/DebugLog';
import { convertTimeStampToDate }  from '../../Utils/DateUtils';
import { switchTheme } from '../../Utils/Themes';
import './Task.css'

export default class Task extends React.Component {
  render(){
    let task = this.props.task;
    let isLast = this.props.isLast;
    let isHighlight = this.props.isHighlight;
    let ren;
    if (task){
      ren =
        <li onClick={this.props.onClick} className={`${isHighlight? 'Task--Highlight':''} flex items-center ph0-l ${isLast?'':'bb'} b--black-10 dim Task`}>
          <i className="fa fa-edit w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
          <div className="pl3 flex-auto">
            <span className="f6 db black-70">{task.title}</span>
            <span className="f6 db black-70">{task.size}</span>
          </div>
          <div>
            <a className="f6 link blue hover-dark-gray">Due {convertTimeStampToDate(task.dueDate)}</a>
          </div>
        </li>;

    } else { //empty state
      ren =
        <li onClick={this.props.onClick} className="flex items-center ph0-l b--black-10 dim Task Task--Empty Task__AnimatedBackground--EmptyState bg-washed-green">
          <i className="fa fa-arrows w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
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
