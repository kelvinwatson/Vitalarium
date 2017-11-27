import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './CloseCreateTaskWarningModal.css'

export default class CloseCreateTaskWarningModal extends React.Component {
  constructor(props){
    super(props);
    this.onCancelClicked = this.onCancelClicked.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
  }

  onCancelClicked(e){
    e.preventDefault();
    this.props.cancel();
  }

  onDeleteClicked(e){
    e.preventDefault();
    this.props.confirmDeleteTask();
  }

  render(){
    return (
      <div className={`CloseCreateTaskWarningModal ${this.props.isOpen ? 'db' : 'dn'}`}>
        <div className="CloseCreateTaskWarningModalContent">

          <header className="CloseCreateTaskWarningModalHeader">
            <i className="fa fa-exclamation-circle mr2" aria-hidden="true"></i>
            <span className="CloseCreateTaskWarningModalHeader__Title">Warning</span>
            <p className="CloseCreateTaskWarningModalHeader__Message">Are you sure you want to abandon this task? Your changes will not be saved.</p>
          </header>

          <div className="CloseCreateTaskModalButtons">
            <a onClick={this.onCancelClicked} className="input-reset f6 link grow br1 ba ph3 pv2 mb2 dib black b--black mr3" href="#0">Cancel</a>
            <a onClick={this.onDeleteClicked} className="input-reset f6 link grow br1 ba ph3 pv2 mb2 dib red b--red" href="#0">Delete task</a>
          </div>
        </div>
      </div>
    )
  }
}
