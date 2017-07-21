import React, { Component } from 'react';
import Dashboard from './pages/Dashboard.react.js'


class App extends Component {
  render() {
    return (
      <div className="App ">
          <div className = "container">
            <Dashboard/>
          </div>
      </div>
    );
  }
}

export default App;
