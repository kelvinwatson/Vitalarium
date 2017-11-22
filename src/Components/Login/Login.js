import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './Login.css'

export default class About extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className={`LoginContent`}>
          <input type="email"/>
          <input type="password"/>
        </div>
    )
  }
}
