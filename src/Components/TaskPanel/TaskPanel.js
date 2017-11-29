import React from 'react';
import CloseCreateTaskWarningModalContainer from '../../Containers/CloseCreateTaskWarningModalContainer';
import DebugLog from '../../Utils/DebugLog';
import { formatDateHyphen } from '../../Utils/DateUtils';
import TaskDetail from '../TaskDetail/TaskDetail';
import 'date-input-polyfill';
import './TaskPanel.css'

export default class TaskPanel extends React.Component {
  constructor(props){
    super(props);

    this.showCloseCreateTaskWarningModal = this.showCloseCreateTaskWarningModal.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /*
   * Preconditions: Assumes inputs not empty since "required" is true in all input attributes
   */
  onFormSubmit(title, description, size, sprintId, dueDate, comments, createdOn, createdBy, destination){
    this.props.createTask(
      title,
      description,
      size,
      sprintId,
      dueDate,
      comments,
      createdOn,
      createdBy,
      destination,
    );
  }

  showCloseCreateTaskWarningModal(){
    this.props.showCloseCreateTaskWarningModal();
  }

  render(){
    DebugLog('isOpenPanel', this.props.isOpen);
    return (
      <div className={`TaskPanel ${this.props.isOpen ? 'TaskPanel--Open' : 'TaskPanel--Close'}`}>
        <TaskDetail
          isModal={false}
          isPanel={true}
          task={this.props.task}
          userId={this.props.userId}
          projectId={this.props.projectId}
          isOpenPanel={this.props.isOpenPanel}
          close={this.props.close}
          onFormSubmit={this.onFormSubmit}
          isCreateFailure={this.props.isCreateFailure}
          currentSprintId={this.props.currentSprintId}
          nextSprintId={this.props.nextSprintId}
          showCloseCreateTaskWarningModal={this.showCloseCreateTaskWarningModal}
          isShowCloseWarning={this.props.isShowCloseWarning}
          onCloseClicked={this.onCloseClicked}/>
      </div>
    )
  }
}
