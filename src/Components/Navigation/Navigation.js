import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navigation.css'

const Navigation = ({ page, list, onNavigationClicked }) => (

  <section className={`NavigationSection`}>
    <span>LOGO/NAME</span>
    <ul className="NavigationList">
      <li className="NavigationList__Item"><Link to="/" onClick={(e) => onNavigationClicked('me')}>Home</Link></li>
      <li className="NavigationList__Item"><Link to="/about" onClick={(e) => onNavigationClicked('me')}>About</Link></li>
      <li className="NavigationList__Item"><Link to="/blog" onClick={(e) => onNavigationClicked('reach')}>Blog</Link></li>
    </ul>

  </section>
)

export default Navigation;
