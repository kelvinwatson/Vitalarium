import React from 'react';
import CloseCreateTaskWarningModalContainer from '../../Containers/CloseCreateTaskWarningModalContainer';
import DebugLog from '../../Utils/DebugLog';
import { formatDateHyphen } from '../../Utils/DateUtils';
import 'date-input-polyfill';
import './TaskDetail.css'

export default class TaskDetail extends React.Component {
  constructor(props){
    super(props);

    let now = Date.now();

    this.state = {
      title: '',
      description: '',
      size: 'S',
      sprintId: null,
      dueDate: now,
      comments: null,
      createdOn: null,
      createdBy: this.props.userId,
      projectId: this.props.projectId,
      today: formatDateHyphen(now),
    };

    this.setModalContentRef = this.setModalContentRef.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeSprint = this.onChangeSprint.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
  }

  componentWillReceiveProps(newProps){
    DebugLog('componentWillReceiveProps', newProps);

    if (newProps.isPanel){ //update task
      //prepopulate
      const task = newProps.task.title;
      this.setState({
        title: task.title,
        description: task.description,
        size: task.size,
        sprintId: task.sprintId,
        dueDate: task.dueDate,
        comments: task.comments,
        createdOn: task.createdOn,
        createdBy: task.createdBy,
        projectId: task.projectId,
      })
    }
  }

  /*
   * Preconditions: Assumes inputs not empty since "required" is true in all input attributes
   */
  onFormSubmit(e){
    e.preventDefault();
    this.props.onFormSubmit(
      this.state.title,
      this.state.description,
      this.state.size,
      this.state.sprintId,
      this.state.projectId,
      this.state.dueDate,
      this.state.comments,
      Date.now(),
      this.state.createdBy,
    );
  }

  /*
   * Set the wrapper reference for outside click detection
   */
  setModalContentRef(node) {
    this.modalContent = node;
  }

  onChangeTitle(e){
    this.setState({title: e.target.value});
  }

  onChangeDescription(e){
    this.setState({description: e.target.value});
  }

  onChangeSize(e) {
    this.setState({size: e.target.value});
  }

  onChangeSprint(e){
    const projectId = this.state.destination.projectId;
    this.setState({
      sprintId: e.target.value,
      destination: {
        sprintId: e.target.value,
        projectId,
      }
    });
  }

  onChangeDueDate(e){
    this.setState({dueDate: e.target.value});
  }

  onCloseClicked(){
    if (this.props.isModal){
      DebugLog('onCloseClicked');
      if (this.state.title || this.state.description){
        this.props.showCloseCreateTaskWarningModal();
      } else {
        this.props.close();
      }
    } else if (this.props.isPanel) {
      DebugLog('onCloseClicked panel');
      //check if updates were made, and show warning if needed
      this.props.close();
    }// else TODO if not modal, close panel
  }

  render(){

    const body =
      <section>
        <header className="TaskModalHeader">
          <i onClick={this.onCloseClicked} className="fa fa-times" aria-hidden="true"></i>
          <CloseCreateTaskWarningModalContainer isOpen={this.props.isShowCloseWarning}/>
        </header>

        <form onSubmit={this.onFormSubmit}>
          <fieldset>
            <label htmlFor="titleField">Title</label>
            <input type="text" placeholder="Give your task a name (e.g. organize workroom, finalize blueprints)" id="titleField"
              value={this.state.title} onChange={this.onChangeTitle} required/>

            <label htmlFor="descriptionField">Description</label>
            <textarea placeholder="Describe your task in detail and be specific about it! (acceptance criteria)" id="descriptionField"
              value={this.state.description} onChange={this.onChangeDescription}></textarea>

            <div className="TaskDetailSizeFlexWrapper">
              <div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Left">
                <label htmlFor="sizeField">Task size</label>
                <select onChange={this.onChangeSize} defaultValue="S" id="sizeField">
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </div>

              <div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Right">
                <label htmlFor="sprintField">Sprint</label>
                <select onChange={this.onChangeSprint} defaultValue={null} id="sprintField">
                  <option value={null}>Backlog</option>
                  <option value={this.props.currentSprintId}>Current sprint</option>
                  <option value={this.props.nextSprintId}>Next sprint</option>
                </select>
              </div>
            </div>

            <div className="TaskDetailSizeFlexWrapper">
              <div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Left">
                <label htmlFor="dueDateField">Due date</label>
                <input type="date" onChange={this.onChangeDueDate} defaultValue={this.state.today} min={this.state.today}/>
              </div>

            </div>

            <div className="TaskDetailButtons">
              <div className={`TaskDetail_ErrorMessage ${this.props.isCreateFailure? 'dib':'dn'} red`}>Unable to comply. Please try again later.</div>
              <input type="submit" className="input-reset f6 link grow br1 ba ph3 pv2 mb2 dib black b--black" href="#0" value="Create Task"/>
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
