import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './TaskModal.css'

export default class TaskModal extends React.Component {
  constructor(props){
    super(props);
    this.setModalContentRef = this.setModalContentRef.bind(this);
    this.handleClickOutsideModalContent = this.handleClickOutsideModalContent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideModalContent);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideModalContent);
  }

  /*
   * Set the wrapper reference for outside click detection
   */
  setModalContentRef(node) {
    this.modalContent = node;
  }

  /*
   * Handle click outside of modalContent
   */
  handleClickOutsideModalContent(e) {
    if (this.modalContent && !this.modalContent.contains(e.target)) {
      DebugLog('CLOSING');
      this.props.onOutsideModalContentClicked(true);
    }
  }

  render(){
    return (
      <div className={`TaskModal ${this.props.isOpen ? 'db' : 'dn'}`}>
        <div ref={this.setModalContentRef} className="TaskModalContent">
          <p>Some text in the Modal..</p>
        </div>
      </div>
    )
  }
}
