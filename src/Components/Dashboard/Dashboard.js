import React from 'react';
import { Link } from 'react-router-dom';
import DebugLog from '../../Utils/DebugLog';
import { switchTheme } from '../../Utils/Themes';
import './Dashboard.css'

export default class Dashboard extends React.Component {
  componentsDidUpdate(){
    if (!this.props.isLoggedIn){
      this.props.history.push('/');
    }
  }

  render(){
    return (
    <div>
      This is the Dashboard
    </div>
    )
  }
}
