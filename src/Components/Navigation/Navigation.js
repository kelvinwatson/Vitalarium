import React from 'react';
import PropTypes from 'prop-types';
import './Navigation.css'

const Navigation = ({ page, list, onNavigationClicked }) => (

  <section className={`NavigationSection`}>
    <ul className="NavigationSection-Left">
      <li className="NavigationListItem--ListItem"><a className="NavigationListItem NavigationListItem--Link"
        onClick={(e) => onNavigationClicked('me')}>Me</a>
      </li>
      <li className="NavigationListItem--ListItem"><a className="NavigationListItem NavigationListItem--Link"
        onClick={(e) => onNavigationClicked('music')}>Music</a></li>
    </ul>

    <div className="NavigationSection-Center">
      <div className="NavigationSection__Logo">KELVIN WATSON</div>
    </div>

    <ul className="NavigationSection-Right">
      <li className="NavigationListItem--ListItem"><a className="NavigationListItem NavigationListItem--Link "
        onClick={(e) => onNavigationClicked('reach')}>Reach</a>
      </li>
      <li className="NavigationListItem--ListItem"><a className="NavigationListItem NavigationListItem--Link"
        onClick={(e) => onNavigationClicked('collaborate')}>Collaborate</a>
      </li>
    </ul>
  </section>
)

export default Navigation;
