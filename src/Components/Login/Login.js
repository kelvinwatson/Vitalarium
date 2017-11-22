import React from 'react';
import DebugLog from '../../Utils/DebugLog';

import 'font-awesome/css/font-awesome.min.css';
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
          <div>Ready to use Vitalarium? Don't worry, it's free!</div>
          <a href="https://github.com/BryceEWatson" target="_blank" className="Login__Icon" onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Google');}}>
            <i className="fa fa-google fa-3x" aria-hidden="true"></i>
            Sign in with Google
          </a>
        </div>
    )
  }
}
