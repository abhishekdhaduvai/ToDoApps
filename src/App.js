import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDo from './components/ToDo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDo />
        <div className="sources">
          Double Click to edit a Task <br /><br />
          Source - <a href="https://github.com/abhishekdhaduvai/ToDoApps/tree/react">GitHub</a>
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
    );
  }
}

export default App;
