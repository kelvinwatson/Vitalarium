import React from 'react';
import CloseCreateTaskWarningModalContainer from '../../Containers/CloseCreateTaskWarningModalContainer';
import DebugLog from '../../Utils/DebugLog';
import { formatDateHyphen } from '../../Utils/DateUtils';
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
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
  }

  getInitialState(){
    let now = Date.now();
    return {
      title: '',
      description: '',
      size: 'S',
      sprint: null,
      project: this.props.projectId,
      dueDate: now,
      comments: null,
      createdOn: null,
      createdBy: this.props.userId,
      today: formatDateHyphen(now),
    };
  }

  componentWillReceiveProps(newProps){
    if (newProps.isPanel && newProps.task){ //prepopulate fields for update task
      const task = newProps.task;
      this.setState({
        title: task.title,
        description: task.description,
        size: task.size,
        sprint: task.sprint,
        project: task.project,
        dueDate: task.dueDate,
        comments: task.comments,
        createdOn: task.createdOn,
        createdBy: task.createdBy,
      });
    }

    DebugLog('componentWillReceiveProps this.props', this.props);

    if (newProps.isModal && newProps.isResetForm){ //only modal should be able to reset form
      this.setState(this.getInitialState());
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
      this.state.sprint,
      this.state.project,
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
    DebugLog('changeTitle', this.state);
    this.setState({title: e.target.value});
  }

  onChangeDescription(e){
    this.setState({description: e.target.value});
  }

  onChangeSize(e) {
    this.setState({size: e.target.value});
  }

  onChangeSprint(e){
    this.setState({sprint: e.target.value});
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

    DebugLog('rerender', this.state);

    let body =
      <section>
        <header className="TaskModalHeader">
          <i onClick={this.onCloseClicked} className="fa fa-times" aria-hidden="true"></i>
          <CloseCreateTaskWarningModalContainer isOpen={this.props.isShowCloseWarning}/>
        </header>

        <form onSubmit={this.onFormSubmit}>
          <fieldset>
            <label htmlFor="titleField">Title</label>
            <input type="text" placeholder="Give your task a name (e.g. organize workroom, finalize blueprints)" id="titleField"
              value={this.state.title || ''} onChange={this.onChangeTitle} required/>

            <label htmlFor="descriptionField">Description</label>
            <textarea placeholder="Describe your task in detail and be specific about it! (acceptance criteria)" id="descriptionField"
              value={this.state.description || ''} onChange={this.onChangeDescription}></textarea>

            <div className="TaskDetailSizeFlexWrapper">
              <div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Left">
                <label htmlFor="sizeField">Task size</label>
                <select onChange={this.onChangeSize} defaultValue="S" value={this.state.size} id="sizeField">
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </div>

              <div className="TaskDetailSizeFlexItem TaskDetailSizeFlexItem--Right">
                <label htmlFor="sprintField">Sprint</label>
                <select onChange={this.onChangeSprint} defaultValue={null} value={this.state.sprint} id="sprintField">
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
