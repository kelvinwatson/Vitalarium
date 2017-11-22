import React, { Component } from 'react';
import AboutContainer from './Containers/AboutContainer';
import './App.css';

/**
 * Views
 */
import NavigationContainer from './Containers/NavigationContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AboutContainer/>
      </div>
    );
  }
}

export default App;
