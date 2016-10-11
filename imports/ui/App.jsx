import React, { Component } from 'react';


import GeneralCharacter, {Mario, GoodGuys, SuperGirl}  from './GeneralCharacter.jsx';
 
import {ASWDcontrols, JIKLcontrols, ArrowControls} from './controls.jsx';


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
            
            <GeneralCharacter data={superGirl}  keys={this.keysPressed} />
            
            <GeneralCharacter data={goodGuy}  keys={this.keysPressed} />
            <GeneralCharacter data={mario}  keys={this.keysPressed} />
          </div>      
        </div>

      </div>
    );
  }
}