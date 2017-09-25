import React, { Component } from 'react';
import './App.css';

/**
 * Views
 */
import NavigationContainer from './Containers/NavigationContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationContainer/>

      </div>
    );
  }
}

export default App;
