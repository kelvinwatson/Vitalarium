import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './Login.css'

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.onClickSignIn = this.onClickSignIn.bind(this);
  }

  onClickSignIn(provider){
    DebugLog('props',this.props);
    this.props.onClickSignIn(provider);
  }

  render(){
    return (
        <div className={`LoginContent`}>
          <button onClick={(e)=>this.onClickSignIn('Google')}>Google SignIn</button>
        </div>
    )
  }
}
