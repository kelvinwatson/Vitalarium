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
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /*
   * Preconditions: Assumes inputs not empty since "required" is true in all input attributes
   */
  onFormSubmit(title, description, size, sprintId, projectId, dueDate, comments, createdOn, createdBy, destination){
    this.props.createTask(
      title,
      description,
      size,
      sprintId,
      projectId,
      dueDate,
      comments,
      createdOn,
      createdBy,
    );
  }

  showCloseCreateTaskWarningModal(){
    this.props.showCloseCreateTaskWarningModal();
  }

  render(){
    return (
      <div className={`${this.props.isOpen? 'TaskModal TaskModal--Open':'dn'}`}>
        <div ref={this.setModalContentRef} className={`${this.props.isOpen? 'TaskModalContent':'TaskPanelContent'}`}>
          <TaskDetail
            isModal={true}
            isPanel={false}
            userId={this.props.userId}
            projectId={this.props.projectId}
            close={this.props.close}
            onFormSubmit={this.onFormSubmit}
            isCreateFailure={this.props.isCreateFailure}
            currentSprintId={this.props.currentSprintId}
            nextSprintId={this.props.nextSprintId}
            showCloseCreateTaskWarningModal={this.showCloseCreateTaskWarningModal}
            isShowCloseWarning={this.props.isShowCloseWarning}
            onCloseClicked={this.onCloseClicked}/>
        </div>
      </div>
    )
  }
}
