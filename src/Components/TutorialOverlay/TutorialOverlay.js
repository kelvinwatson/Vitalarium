import React from 'react';
// import DebugLog from '../../Utils/DebugLog';
import './TutorialOverlay.css'

export default class TutorialOverlay extends React.Component {
  render(){
    return (
      <div className={`TutorialOverlay ${this.props.isShow?'db':'dn'}`}>
        Tutorial Overlay
      </div>
    )
  }
}
