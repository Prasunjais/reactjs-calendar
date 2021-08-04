import React, { Component } from "react";
import EventCalendar from './containers/eventCalendar';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
        <h2 className="head">React Calendar</h2>
        </header>
        <br />
        <hr className="hr-style" />
        <EventCalendar />
      </div>
    </React.Fragment>
  );
}

export default App;
