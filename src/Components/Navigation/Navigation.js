import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navigation.css'

const Navigation = ({ page, list, onNavigationClicked }) => (
  <nav className="db dt-l w-100 border-box pa3 bb b--black-10 Navigation--LeftPadding">
    <a className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="#" title="Vitalarium">
      {/*<img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Vitalarium"/>*/}
      <div className="f2 lh-copy">VITALARIUM</div>
      <div>Scrum Task Organizer</div>
    </a>
    <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
      <Link to="/" className="link dim dark-gray f6 f5-l dib mr3 mr4-l" onClick={(e) => onNavigationClicked('me')}>Home</Link>
      <Link to="/about" className="link dim dark-gray f6 f5-l dib mr3 mr4-l" onClick={(e) => onNavigationClicked('me')}>How It Works</Link>
      <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Blog">Blog</a>
      <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Press">Press</a>
      <Link to="/login" className="link dim dark-gray f6 f5-l dib mr3 mr4-l" onClick={(e) => onNavigationClicked('login')}>Login</Link>
      <Link to="/blog" className="link dim dark-gray f6 f5-l dib mr3 mr4-l" onClick={(e) => onNavigationClicked('reach')}>Reach</Link>
    </div>
  </nav>
)

export default Navigation;
