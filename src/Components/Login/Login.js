import React from 'react';
import Loading from '../Loading/Loading';
import DebugLog from '../../Utils/DebugLog';

import 'font-awesome/css/font-awesome.min.css';
import './Login.css'

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.onClickSignIn = this.onClickSignIn.bind(this);
  }

  componentDidUpdate(){
    if (this.props.user || this.props.isLoggedIn){
      this.props.history.push('/dashboard');
    }
  }

  onClickSignIn(provider){
    this.props.onClickSignIn(provider);
  }

  render(){
    let ren;
    if (this.props.isLoginInProgress && !this.props.user){
      ren =
        <aside>
          <h2 className="center ph3 ph5-ns tc br2 mt5">Logging you in...</h2>
          <p className="tc mb5">One moment please.</p>
          <div className="center measure tc LoginLoading">
            <Loading isLoading={this.props.isLoginInProgress}/>
          </div>
        </aside>;
    } else if (this.props.previousProvider){

      let providerCapitalized, providerLowerCase;
      switch(this.props.previousProvider){
        case 'facebook.com':
          providerCapitalized = 'Facebook';
          providerLowerCase = 'facebook';
          break;
        case 'github.com':
          providerCapitalized = 'Github';
          providerLowerCase = 'github';
          break;
        case 'google.com':
          providerCapitalized = 'Google';
          providerLowerCase = 'google';
          break;
        case 'twitter.com':
          providerCapitalized = 'Twitter';
          providerLowerCase = 'twitter';
          break;
      }
      ren =
        <div>
          <h2 className="center ph3 ph5-ns tc br2 mt5">Account already exists</h2>
          <p className="tc mb5">Looks like you already have an account with us</p>
          <ul className="tl list pl0 mt0 measure center LoginList mb5">
            <li onClick={(e)=>{ e.preventDefault(); this.onClickSignIn(providerCapitalized);}}
              className="flex items-center lh-copy pa3 ph0-l b--black-10 dim LoginList__Item">
              <i className={`tc fa fa-${providerLowerCase} fa-3x w2 h2 w3-ns br-100 LoginIconHeight`} aria-hidden="true"></i>
              <div className="tr pl3 flex-auto">
                <span className="f6 db black-70">Sign in with {providerCapitalized}</span>
              </div>
            </li>
          </ul>
        </div>
    } else {
      ren =
        <div>
          <h2 className="center ph3 ph5-ns tc br2 mt5">Ready to use Vitalarium?</h2>
          <p className="tc mb5">Don't worry, it's free!</p>
          <ul className="tl list pl0 mt0 measure center LoginList mb5">
            <li onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Facebook');}} className="flex items-center lh-copy pa3 ph0-l bb b--black-10 dim LoginList__Item">
              <i className="tc fa fa-facebook fa-3x w2 h2 w3-ns br-100 LoginIconHeight" aria-hidden="true"></i>
              <div className="tr pl3 flex-auto">
                <span className="f6 db black-70">Sign in with Facebook</span>
              </div>
            </li>
            <li onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Github');}} className="flex items-center lh-copy pa3 ph0-l bb b--black-10 dim LoginList__Item">
              <i className="tc fa fa-github fa-3x w2 h2 w3-ns h3 br-100 LoginIconHeight" aria-hidden="true"></i>
              <div className="tr pl3 flex-auto">
                <span className="f6 db black-70">Sign in with Github</span>
              </div>
            </li>
            <li onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Google');}} className="flex items-center lh-copy pa3 ph0-l bb b--black-10 dim LoginList__Item">
              <i className="tc fa fa-google fa-3x w2 h2 w3-ns br-100 LoginIconHeight" aria-hidden="true"></i>
              <div className="tr pl3 flex-auto">
                <span className="f6 db black-70">Sign in with Google</span>
              </div>
            </li>
            <li onClick={(e)=>{ e.preventDefault(); this.onClickSignIn('Twitter');}} className="flex items-center lh-copy pa3 ph0-l b--black-10 dim LoginList__Item">
              <i className="tc fa fa-twitter fa-3x w2 h2 w3-ns h3 br-100 LoginIconHeight" aria-hidden="true"></i>
              <div className="tr pl3 flex-auto">
                <span className="f6 db black-70">Sign in with Twitter</span>
              </div>
            </li>
          </ul>
        </div>;
    }

    return (
      <div className={`LoginContent`}>
        {ren}
      </div>
    )
  }
}
