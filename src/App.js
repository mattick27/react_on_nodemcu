import React, { Component } from 'react';
import Dashboard from './pages/Dashboard.react.js'
import './pages/Dashboard.css'
import './App.css';

class App extends Component {
  render() {
    return (
    <div className="canvas"> 

        <div className="header"> 
        </div>

        <div className="dashboard"> 
        </div>

        <div className= "group_ext">
            <div className= "dashboard_ext">
            </div> 
            <div className= "dashboard_ext">
            </div>   
            <div className= "dashboard_ext">
            </div>     
        </div>
    </div>
    );
  }
}

export default App;
