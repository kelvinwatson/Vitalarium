import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './About.css'

export default class About extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className={`AboutContent`}>
          About page
        </div>
    )
  }
}
