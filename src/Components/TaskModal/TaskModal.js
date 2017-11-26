import React from 'react';
import CloseCreateTaskWarningModalContainer from '../../Containers/CloseCreateTaskWarningModalContainer';
import DebugLog from '../../Utils/DebugLog';
import 'date-input-polyfill';
import './TaskModal.css'

export default class TaskModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      description: '',
      size: 'SMALL',
      sprint: 'backlog',
    };

    this.setModalContentRef = this.setModalContentRef.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeSprint = this.onChangeSprint.bind(this);
    // this.handleClickOutsideModalContent = this.handleClickOutsideModalContent.bind(this);
  }

  /*
   * Preconditions: Assumes inputs not empty since "required" is true in all input attributes
   */
  onFormSubmit(e){
    e.preventDefault();
    // this.props.createTask(Date.now(), this.state.title, this.state.description, this.state.size, this.state.sprint);
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
    DebugLog('e.target.value',e.target.value);
    this.setState({size: e.target.value});
  }

  onChangeSprint(e){
    DebugLog('e.target.value',e.target.value);
    this.setState({sprint: e.target.value})
  }


  onCloseClicked(){
    //TODO: show warning

    //check if title or description filled out, then warn user
    if (this.state.title || this.state.description){
      this.props.showCloseCreateTaskWarningModal();
    } else {
      this.props.close();
    }
  }

  // componentDidMount() {
  //   document.addEventListener('mousedown', this.handleClickOutsideModalContent);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClickOutsideModalContent);
  // }

  // /*
  //  * Handle click outside of modalContent
  //  */
  // handleClickOutsideModalContent(e) {
  //   if (this.modalContent && !this.modalContent.contains(e.target)) {
  //     DebugLog('CLOSING');
  //     this.props.onOutsideModalContentClicked(true);
  //   }
  // }

  render(){
    return (
      <div className={`TaskModal ${this.props.isOpen ? 'db' : 'dn'}`}>
        <div ref={this.setModalContentRef} className="TaskModalContent">

          <header className="TaskModalHeader">

            <i onClick={this.onCloseClicked} className="fa fa-times" aria-hidden="true"></i>
            <CloseCreateTaskWarningModalContainer isOpen={this.props.isShowCloseWarning}/>
          </header>

          {/* START TASK FORM */}
          <form onSubmit={this.onFormSubmit}>
            <fieldset>
              <label htmlFor="titleField">Title</label>
              <input type="text" placeholder="Give your task a name (e.g. organize workroom, finalize blueprints)" id="titleField"
                value={this.state.title} onChange={this.onChangeTitle} required/>

              <label htmlFor="descriptionField">Description</label>
              <textarea placeholder="Describe your task in detail and be specific about it! (acceptance criteria)" id="descriptionField"
                value={this.state.description} onChange={this.onChangeDescription}></textarea>

              <div className="TaskModalSizeFlexWrapper">
                <div className="TaskModalSizeFlexItem TaskModalSizeFlexItem--Left">
                  <label htmlFor="sizeField">Task size</label>
                  <select onChange={this.onChangeSize} defaultValue="SMALL" id="sizeField">
                    <option value="SMALL">Small</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LARGE">Large</option>
                  </select>
                </div>

                <div className="TaskModalSizeFlexItem TaskModalSizeFlexItem--Right">
                  <label htmlFor="sprintField">Sprint</label>
                  <select onChange={this.onChangeSprint} defaultValue="backlog" id="sprintField">
                    <option value="backlog">Backlog</option>
                    <option value="currentSprint">Current sprint</option>
                    <option value="nextSprint">Next sprint</option>
                  </select>
                </div>
              </div>

              <div className="TaskModalSizeFlexWrapper">
                <div className="TaskModalSizeFlexItem TaskModalSizeFlexItem--Left">
                  <label htmlFor="dueDateField">Due date</label>
                  <input type="date"/>
                </div>

              </div>
              {/*<input className="button-primary" type="submit" value="Send"/>*/}

              <div className="TaskModalButtons">
                <input type="submit" className="input-reset f6 link grow br1 ba ph3 pv2 mb2 dib black b--black" href="#0" value="Create Task"/>
              </div>
            </fieldset>
          </form>
          {/* END TASK FORM */}
        </div>
      </div>
    )
  }
}
