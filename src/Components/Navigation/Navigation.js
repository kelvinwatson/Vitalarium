import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import { Link } from 'react-router-dom';
import './Navigation.css'

const Navigation = ({ isLoggedIn, onLoginLogoutClicked, onNavigationClicked }) => {
  return (
    <nav className="db dt-l w-100 border-box bb b--black-10 ph5-ns pv3">
      <Link to="/" className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l">
        <div className="f2 lh-copy Navigation__Logo near-black"><span className="Navigation__Logo--Border">_</span>Vitalarium</div>
        <div>Scrum Task Organizer</div>
      </Link>
      <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
        <Link to="/about" className="link dim dark-gray f6 f5-l dib mr3 mr4-l" onClick={(e) => onNavigationClicked('me')}>How It Works</Link>
        <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Press">Press</a>
        <Link to="/blog" className="link dim dark-gray f6 f5-l dib mr3 mr4-l" onClick={(e) => onNavigationClicked('reach')}>Reach</Link>
        <Link to="/dashboard" className={`link dim dark-gray f6 f5-l dib mr3 mr4-l ${isLoggedIn? 'NavigationItem--Display':'NavigationItem--Hide'}`} onClick={(e) => onNavigationClicked('me')}>Dashboard</Link>
        <Link to="/login" className="link dim dark-gray f6 f5-l dib mr3 mr4-l" onClick={(e) => {onLoginLogoutClicked(e, isLoggedIn)}}>{isLoggedIn?'Logout':'Login'}</Link>
      </div>
    </nav>
  )
}

export default Navigation;
