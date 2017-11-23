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
          <h2 className="center ph3 ph5-ns tc br2 pt4">
            Ready to use Vitalarium?
          </h2>
          <p className="tc mb4">Don't worry, it's free!</p>

          <ul className="list pl0 mt0 measure center LoginList">
            <a href="https://github.com/BryceEWatson" target="_blank" className="Login__Icon" onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Facebook');}}>
              <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10 dim">
                <i className="tc fa fa-facebook fa-3x w2 h2 w3-ns br-100 LoginIconHeight" aria-hidden="true"></i>
                <div className="pl3 flex-auto">
                  <span className="f6 db black-70">Sign in with Facebook</span>
                </div>
              </li>
            </a>
            <a href="https://github.com/BryceEWatson" target="_blank" className="Login__Icon" onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Github');}}>
              <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10 dim">
                <i className="tc fa fa-github fa-3x w2 h2 w3-ns h3 br-100 LoginIconHeight" aria-hidden="true"></i>
                <div className="pl3 flex-auto">
                  <span className="f6 db black-70">Sign in with Github</span>
                </div>
              </li>
            </a>
            <a href="https://github.com/BryceEWatson" target="_blank" className="Login__Icon" onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Google');}}>
              <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10 dim">
                <i className="tc fa fa-google fa-3x w2 h2 w3-ns br-100 LoginIconHeight" aria-hidden="true"></i>
                <div className="pl3 flex-auto">
                  <span className="f6 db black-70">Sign in with Google</span>
                </div>
              </li>
            </a>
            <a href="https://github.com/BryceEWatson" target="_blank" className="Login__Icon" onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Twitter');}}>
              <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10 dim">
                <i className="tc fa fa-twitter fa-3x w2 h2 w3-ns h3 br-100 LoginIconHeight" aria-hidden="true"></i>
                <div className="pl3 flex-auto">
                  <span className="f6 db black-70">Sign in with Twitter</span>
                </div>
              </li>
            </a>
          </ul>
        </div>
    )
  }
}
