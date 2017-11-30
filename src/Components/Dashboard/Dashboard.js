import React from 'react';
import { Link } from 'react-router-dom';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// replace above with touch backend
import { default as TouchBackend } from 'react-dnd-touch-backend';
//https://github.com/yahoo/react-dnd-touch-backend

import DebugLog from '../../Utils/DebugLog';
import { switchTheme } from '../../Utils/Themes';
import Loading from '../Loading/Loading';
import BacklogContainer from '../../Containers/BacklogContainer';
import SprintsContainer from '../../Containers/SprintsContainer';
import TaskModalContainer from '../../Containers/TaskModalContainer';
import TaskPanelContainer from '../../Containers/TaskPanelContainer';
import TutorialOverlayContainer from '../../Containers/TutorialOverlayContainer';
import './Dashboard.css'

class Dashboard extends React.Component {
  componentWillReceiveProps(newProps){
    if (newProps.isLoginFailure){
      this.props.history.push('/');
    }
  }

  render(){
    //default should be the loading message
    let ren =
      <aside>
        <h2 className="center ph3 ph5-ns tc br2 mt5">Loading your dashboard...</h2>
        <p className="tc mb5">One moment please.</p>
        <div className="center measure tc Dashboard__Loading">
          <Loading isLoading={true}/>
        </div>
      </aside>;

    if(this.props.isSuccess){
      ren =
        <div className="Dashboard">
          <TutorialOverlayContainer/>
          <TaskModalContainer/>
          <TaskPanelContainer/>
          <div className="Dashboard__BacklogWrapper">
            <BacklogContainer/>
          </div>
          <div className="Dashboard__SprintsWrapper">
            <SprintsContainer/>
          </div>
        </div>
    } else if (this.props.isFailure) {
      ren =
        <aside>
          <h2 className="center ph3 ph5-ns tc br2 mt5">Unable to load your dashboard...</h2>
          <p className="tc mb5">Please try again later.</p>
          <div className="center measure tc Dashboard__Loading">
            <i className="fa fa-frown-o fa-3x" aria-hidden="true"></i>
          </div>
        </aside>;
    }

    return (
      <div>
        {ren}
      </div>
    )
  }
}
export default DragDropContext(TouchBackend({
  enableMouseEvents: true,
  enableMouseEvents: true}))(Dashboard);
// export default DragDropContext(HTML5Backend)(Dashboard);
