import React from 'react';
import CloseCreateTaskWarningModalContainer from '../../Containers/CloseCreateTaskWarningModalContainer';
import DebugLog from '../../Utils/DebugLog';
import { formatDateHyphen } from '../../Utils/DateUtils';
import TaskDetail from '../TaskDetail/TaskDetail';
import 'date-input-polyfill';
import './TaskModal.css'

export default class TaskModal extends React.Component {
  constructor(props){
    super(props);

    this.showCloseCreateTaskWarningModal = this.showCloseCreateTaskWarningModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  closeModal(){
    this.props.close();
  }

  render(){
    return (
      <TaskDetail
        userId={this.props.userId}
        projectId={this.props.projectId}
        isModal={true}
        isOpen={this.props.isOpen}
        closeModal={this.closeModal}
        onFormSubmit={this.onFormSubmit}
        isCreateFailure={this.props.isCreateFailure}
        currentSprintId={this.props.currentSprintId}
        nextSprintId={this.props.nextSprintId}
        showCloseCreateTaskWarningModal={this.showCloseCreateTaskWarningModal}
        isShowCloseWarning={this.props.isShowCloseWarning}
        onCloseClicked={this.onCloseClicked}/>
    )
  }
}
