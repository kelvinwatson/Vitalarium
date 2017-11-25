import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import 'date-input-polyfill';
import './TaskModal.css'

export default class TaskModal extends React.Component {
  constructor(props){
    super(props);
    this.setModalContentRef = this.setModalContentRef.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);
    // this.handleClickOutsideModalContent = this.handleClickOutsideModalContent.bind(this);
  }

  onCloseClicked(){
    //TODO: show warning
    this.props.onOutsideModalContentClicked();
  }

  // componentDidMount() {
  //   document.addEventListener('mousedown', this.handleClickOutsideModalContent);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClickOutsideModalContent);
  // }
  //
  /*
   * Set the wrapper reference for outside click detection
   */
  setModalContentRef(node) {
    this.modalContent = node;
  }
  //
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
          </header>

          {/* START TASK FORM */}
          <form>
            <fieldset>
              <label htmlFor="titleField">Title</label>
              <input type="text" placeholder="Give your task a name (e.g. organize workroom, finalize blueprints)" id="titleField"/>

              <label htmlFor="descriptionField">Description</label>
              <textarea placeholder="Describe your task in detail and be specific about it! (acceptance criteria)" id="descriptionField"></textarea>

              <div className="TaskModalSizeFlexWrapper">
                <div className="TaskModalSizeFlexItem TaskModalSizeFlexItem--Left">
                  <label htmlFor="sizeField">Task size</label>
                  <select id="sizeField">
                    <option value="SMALL" selected>Small</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LARGE">Large</option>
                  </select>
                </div>

                <div className="TaskModalSizeFlexItem TaskModalSizeFlexItem--Right">
                  <label htmlFor="sprintField">Sprint</label>
                  <select id="sprintField">
                    <option value="currentSprint" selected>Current sprint</option>
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
                <a className="f6 link dim br1 ba ph3 pv2 mb2 dib black" href="#0">Create Task</a>
              </div>
            </fieldset>
          </form>
          {/* END TASK FORM */}
        </div>
      </div>
    )
  }
}
