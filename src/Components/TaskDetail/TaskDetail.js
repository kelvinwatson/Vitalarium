import React from 'react';
import CloseCreateTaskWarningModalContainer from '../../Containers/CloseCreateTaskWarningModalContainer';
import Task from '../../Models/Task';
import DebugLog from '../../Utils/DebugLog';
import { convertDateMillsecondsToHyphenated } from '../../Utils/DateUtils';
import 'date-input-polyfill';
import './TaskDetail.css'

export default class TaskDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = this.getInitialState();

    this.setModalContentRef = this.setModalContentRef.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeSprint = this.onChangeSprint.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    // this.onChangeDueDate = this.onChangeDueDate.bind(this);
  }

  getInitialState(){
    let now = Date.now();
    return {
      id: undefined,
      title: '',
      description: '',
      size: 'S',
      prevSprint: this.props.task && this.props.task.sprint || 'backlog',
      sprint: this.props.task && this.props.task.sprint || 'backlog',
      project: this.props.task && this.props.task.project || this.props.projectId,
      // dueDate: this.props.task && this.props.task.dueDate && convertDateMillsecondsToHyphenated(this.props.task.dueDate) || convertDateMillsecondsToHyphenated(now),
      comments: this.props.task && this.props.task.comments || null,
      createdOn: this.props.task && this.props.task.createdOn || now,
      createdBy: this.props.task && this.props.task.createdOn || this.props.userId || null,
      today: convertDateMillsecondsToHyphenated(now),

      updatedOn: this.props.task && this.props.task.updatedOn || null,
      updatedBy: this.props.task && this.props.task.updatedBy || this.props.userId || null,
      status: this.props.task && this.props.task.status || 'Not Started',
    };
  }

  componentWillReceiveProps(newProps){
    // DebugLog('componentWillReceiveProps', newProps);
    if (newProps.isPanel && newProps.task){ //prepopulate fields for update task
      const task = newProps.task;
      this.setState({
        id: task.id,
        title: task.title,
        description: task.description,
        size: task.size,
        prevSprint: task.sprint,
        sprint: task.sprint || null,
        project: task.project,
        // dueDate: convertDateMillsecondsToHyphenated(task.dueDate),
        comments: task.comments || null,
        createdOn: task.createdOn || null,
        createdBy: task.createdBy,
        updatedOn: task.updatedOn || null,
        updatedBy: task.updatedBy || this.props.userId || null,
        status: task.status || 'Not Started',
      });
    }
    if (newProps.isModal && newProps.isResetForm){ //only the create task modal should be able to reset form
      this.setState(this.getInitialState());
    }
  }

  /*
   * Preconditions: Assumes inputs not empty since "required" is true in all input attributes
   */
  onFormSubmit(e){
    e.preventDefault();

    let task = new Task.Builder()
      .withId(this.state.id)
      .withTitle(this.state.title)
      .withDescription(this.state.description)
      .withSize(this.state.size)
      .withSprint(this.state.sprint)
      .withProject(this.state.project)
      .withComments(this.state.comments)
      .withCreatedOn(this.state.createdOn)
      .withCreatedBy(this.state.createdBy)
      .withUpdatedOn(Date.now())
      .withUpdatedBy(this.state.updatedBy || this.props.task.updatedBy || this.props.userId)
      .withStatus(this.state.status || 'Not Started')
      .build();

    this.props.onFormSubmit(task, this.state.prevSprint);
  }

  /*
   * Set the wrapper reference for outside click detection
   */
  setModalContentRef(node) {
    this.modalContent = node;
  }

  onChangeTitle(e){
    // DebugLog('changeTitle', this.state);
    this.setState({title: e.target.value});
  }

  onChangeDescription(e){
    this.setState({description: e.target.value});
  }

  onChangeSize(e) {
    this.setState({size: e.target.value});
  }

  onChangeStatus(e){
    DebugLog('onChangeStatus', e.target.value);
    this.setState({status: e.target.value});
  }

  onChangeSprint(e){
    const prevSprint = this.state.sprint;
    DebugLog('prevSprint', prevSprint);
    DebugLog('newSprint', e.target.value);
    this.setState({
      prevSprint: prevSprint,
      sprint: e.target.value
    });
  }

  // onChangeDueDate(e){
  //   // DebugLog('e.target.value',e.target.value);
  //   this.setState({dueDate: e.target.value});
  // }

  onCloseClicked(){
    if (this.props.isModal){
      // DebugLog('onCloseClicked');
      if (this.state.title || this.state.description){
        this.props.showCloseCreateTaskWarningModal();
      } else {
        this.props.close();
      }
    } else if (this.props.isPanel) {
      // DebugLog('onCloseClicked panel');
      //check if updates were made, and show warning if needed
      this.props.close();
    }// else TODO if not modal, close panel
  }

  render(){
    const {
      isShowCloseWarning,
      currentSprintId,
      nextSprintId,
      isCreateFailure,
      isModal,
    } = this.props;

    // DebugLog('this.state.dueDate', this.state.dueDate);

    let body =
      <section>
        <header className="TaskModalHeader">
          <i onClick={this.onCloseClicked} className="fa fa-times" aria-hidden="true"></i>
          <CloseCreateTaskWarningModalContainer isOpen={isShowCloseWarning}/>
        </header>

        <form onSubmit={this.onFormSubmit}>
          <fieldset>
            <label htmlFor="titleField">Title</label>
            <input type="text" placeholder="Give your task a name (e.g. organize workroom, finalize blueprints)" id="titleField"
              value={this.state.title || ''} onChange={this.onChangeTitle} required/>

            <label htmlFor="descriptionField">Description</label>
            <textarea className="TaskDetail__Description" placeholder="Describe your task in detail and be specific about it! (acceptance criteria)" id="descriptionField"
              value={this.state.description || ''} onChange={this.onChangeDescription}></textarea>

            <div className="TaskDetailSizeFlexWrapper">
              <div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Left">
                <label htmlFor="sizeField">Task size</label>
                <select onChange={this.onChangeSize} value={this.state.size} id="sizeField">
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </div>

              <div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Right">
                <label htmlFor="sprintField">Sprint</label>
                <select onChange={this.onChangeSprint} value={this.state.sprint} id="sprintField">
                  <option value={'backlog'}>Backlog</option>
                  <option value={currentSprintId}>Current sprint</option>
                  <option value={nextSprintId}>Next sprint</option>
                </select>
              </div>
            </div>

            <div className="TaskDetailSizeFlexWrapper">
              {/*<div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Left">
                <label htmlFor="dueDateField">Due date</label>
                <input type="date" onChange={this.onChangeDueDate} value={this.state.dueDate} min={this.state.today}/>
              </div>*/}

              <div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Left">
                <label htmlFor="statusField">Status</label>
                <select onChange={this.onChangeStatus} value={this.state.status} id="statusField">
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

            </div>

            <div className="TaskDetailButtons">
              <div className={`TaskDetail_ErrorMessage ${isCreateFailure ? 'dib':'dn'} red`}>Unable to comply. Please try again later.</div>
              <input type="submit" className="input-reset f6 link grow br1 ba ph3 pv2 mb2 dib black b--black" href="#0"
                value={`${isModal? 'Create Task' :'Save Changes'}`}/>
            </div>
          </fieldset>
        </form>
      </section>;

    return (
      <div>
        {body}
      </div>
    )
  }
}
