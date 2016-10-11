import React, { Component } from 'react';


import GeneralCharacter, {Mario, GoodGuys, SuperGirl}  from './GeneralCharacter.jsx';
 
import {ASWDcontrols, JIKLcontrols, ArrowControls} from './controls.jsx';


// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      dt: 0,
    };
    window.addEventListener("keydown", this.keyPressedListener.bind(this), true);
    window.addEventListener("keyup", this.keyReleasedListener.bind(this), true);
    this.keysPressed = {};

    this.now;
    this.last = this.timestamp();
    //this.step = 1/60;
    this.timestamp = this.timestamp.bind(this);
    this.frame = this.frame.bind(this);


    requestAnimationFrame(this.frame);

  }

  timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

  frame() {
    this.now = this.timestamp();
    this.setState({timeTicker:  {dt: Math.min(1, (this.now - this.last) / 1000), time: this.now} });
    //this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
    // while(this.dt > this.step) {
    //   this.dt = this.dt - this.step;
    //   update(step);   //  done for physics engine to be smooth
    // }
    // render(dt);
    // console.log(this.dt + "render");
     //console.log(this.state.dt + "render");
    this.last = this.now;
    requestAnimationFrame(this.frame);
  }

  keyPressedListener(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    this.keysPressed[key] = true;
  }
  keyReleasedListener(e){
    let key = e.keyCode ? e.keyCode : e.which;
    this.keysPressed[key] = false;
  }

  characterConstructor(characterTemplate, controlKeys, x=20, y=20 ,speed, size){

    position = {};
    position.xPos =  x;
    position.yPos =  y;
    
    characterTemplate.speed =  typeof speed !== 'undefined' ? speed : characterTemplate.speed; 
    characterTemplate.sprite_multiplier =  typeof size !== 'undefined' ? size : characterTemplate.sprite_multiplier; 

    characterData = {
      position: position,
      controls: controlKeys,
      config: characterTemplate,
    };
    
    return characterData;
  }

 
  render() {

    let goodGuy = this.characterConstructor(GoodGuys, ASWDcontrols, 200, 200);
    let mario = this.characterConstructor(Mario, ArrowControls, 400, 400);
    let superGirl = this.characterConstructor(SuperGirl, JIKLcontrols, 400, 100);

    return (
      <div className="container">
        <header>
          <h1 className="neon">Sprite Canvas</h1>
        </header>
        <div className="field_border">

          <div className="field">
            
            <GeneralCharacter data={superGirl}  keys={this.keysPressed} ticker={this.state.timeTicker} />
            
            <GeneralCharacter data={goodGuy}  keys={this.keysPressed} ticker={this.state.timeTicker} />
            <GeneralCharacter data={mario}  keys={this.keysPressed} ticker={this.state.timeTicker} />
          </div>      
        </div>

      </div>
    );
  }
}