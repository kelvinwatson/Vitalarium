import React from 'react';
import { Link } from 'react-router-dom';
import DebugLog from '../../Utils/DebugLog';
import { switchTheme } from '../../Utils/Themes';
import SprintsContainer from '../../Containers/SprintsContainer';
import TaskModalContainer from '../../Containers/TaskModalContainer';
import TasksContainer from '../../Containers/TasksContainer';
import TutorialOverlayContainer from '../../Containers/TutorialOverlayContainer';
import './Dashboard.css'

export default class Dashboard extends React.Component {
  componentWillReceiveProps(newProps){
    DebugLog('componentWillReceiveProps this.props.isLoggedIn', this.props.isLoginFailure);
    if (newProps.isLoginFailure){
      this.props.history.push('/');
    }
  }

  render(){
    return (
        <div className="Dashboard">
          <TutorialOverlayContainer/>

          <TaskModalContainer/>
          <div className="Dashboard__TasksWrapper">
            <TasksContainer/>
          </div>
          <div className="Dashboard__SprintsWrapper">
            <SprintsContainer/>
          </div>
        </div>
    )
  }
}
