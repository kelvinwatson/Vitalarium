import React from 'react';
import CloseCreateTaskWarningModalContainer from '../../Containers/CloseCreateTaskWarningModalContainer';
import DebugLog from '../../Utils/DebugLog';
import { convertDateMillsecondsToHyphenated } from '../../Utils/DateUtils';
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
  onFormSubmit(task){
    this.props.createTask(task);
  }

  showCloseCreateTaskWarningModal(){
    this.props.showCloseCreateTaskWarningModal();
  }

  render(){
    return (
      <div className={`${this.props.isOpen? 'TaskModal TaskModal--Open':'dn'}`}>
        <div ref={this.setModalContentRef}
          className={`${this.props.isOpen? 'TaskModalContent':'TaskPanelContent'}`}>
          <TaskDetail
            isModal={true}
            isPanel={false}
            userId={this.props.userId}
            projectId={this.props.projectId}
            close={this.props.close}
            onFormSubmit={this.onFormSubmit}
            isResetForm={this.props.isCreateSuccess}
            isCreating={this.props.isCreating}
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
