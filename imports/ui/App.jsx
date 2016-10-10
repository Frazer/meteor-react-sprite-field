import React, { Component } from 'react';

import SuperGirl  from './SuperGirl.jsx';
import Mario  from './Mario.jsx';
import DemonHunters  from './DemonHunters.jsx';
 

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
    };
    window.addEventListener("keydown", this.keyPressedListener.bind(this), true);
    window.addEventListener("keyup", this.keyReleasedListener.bind(this), true);
    this.keysPressed = {};

  }
  keyPressedListener(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    this.keysPressed[key] = true;
  }
  keyReleasedListener(e){
    let key = e.keyCode ? e.keyCode : e.which;
    this.keysPressed[key] = false;
  }

 
  render() {
    return (
      <div className="container">
        <header>
          <h1 className="neon">Frazzle Land</h1>
        </header>
        <div className="field_border">

          <div className="field">
            <Mario keys={this.keysPressed} />
            <SuperGirl keys={this.keysPressed} />
            <DemonHunters keys={this.keysPressed} />
          </div>      
        </div>

      </div>
    );
  }
}