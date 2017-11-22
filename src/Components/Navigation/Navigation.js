import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navigation.css'

const Navigation = ({ page, list, onNavigationClicked }) => (

  <section className={`NavigationFlex`}>
    <span className="NavigationFlex__Item NavigationFlex__Logo">VITALARIUM</span>
    <span className="NavigationFlex__Item NavigationFlex__Slogan">Organize your life, Agile style</span>
    <ul className="NavigationFlex__Item NavigationFlex__List NavigationList">
      <li className="NavigationList__Item"><Link to="/" onClick={(e) => onNavigationClicked('me')}>Home</Link></li>
      <li className="NavigationList__Item"><Link to="/about" onClick={(e) => onNavigationClicked('me')}>About</Link></li>
      <li className="NavigationList__Item"><Link to="/blog" onClick={(e) => onNavigationClicked('reach')}>Create Task</Link></li>
    </ul>

  </section>
)

export default Navigation;
