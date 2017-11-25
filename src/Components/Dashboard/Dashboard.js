import React from 'react';
import { Link } from 'react-router-dom';
import DebugLog from '../../Utils/DebugLog';
import { switchTheme } from '../../Utils/Themes';
import TasksContainer from '../../Containers/TasksContainer';
import SprintsContainer from '../../Containers/SprintsContainer';
import './Dashboard.css'

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    // DebugLog('constructor this.props', props);

  }
  // componentWillMount(){
  //   DebugLog('componentWillMount this.props', this.props.isLoginFailure);
  //   if (this.props.isLoginFailure){
  //     this.props.history.push('/');
  //   }
  // }

  componentWillReceiveProps(newProps){
    DebugLog('componentWillReceiveProps this.props.isLoggedIn', this.props.isLoginFailure);
    if (newProps.isLoginFailure){
      this.props.history.push('/');
    }
  }

  render(){
    return (
      <div className="Dashboard">
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
