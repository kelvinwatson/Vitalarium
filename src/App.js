import React, { Component } from 'react';
import About from './Components/About/About';
import Login from './Components/Login/Login';
import './App.css';

/**
 * Views
 */
import NavigationContainer from './Containers/NavigationContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <About/>
        <Login/>
      </div>
    );
  }
}

export default App;
