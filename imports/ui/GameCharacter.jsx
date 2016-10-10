import React, { Component, PropTypes } from 'react';
 

//////  An attempt to abstract character control to simplify multiple characters

//////  also considered making all characters in to one object, and just passing something like this when creating an object from the App:
  //
  //
  // let superGirl = {
  //   this.sprite_height: 123,
  //   this.sprite_width: 123,
  //
  //   this.outfits: 1,
  //   this.animation_steps: 8,
  //   this.characterType: 'super_girl',
  //
  //   this.downKey: 75,  // K - JIKL
  //   this.upKey: 73,  //  I
  //   this.leftKey: 74,   //J
  //   this.rightKey: 76, // L
  //
  //   cloth: 0,
  //   xPos: 0,
  //   yPos: 0,
  //   speed: 12,
  //   sprite_multiplier: 0.5,
  // }
  //
  // and in Render:
  // <GameCharacter opts={superGirl}>




GameCharacter = {};

GameCharacter.Helper = {


  respondToKeys: function(){}

  growCharacter: function(){
    console.log("hi");
      if (this.state.sprite_multiplier<2){
        let size = this.state.sprite_multiplier + 0.1;
        updates.sprite_multiplier = size;
        if (this.state.xPos>this.state.fieldWidth-this.sprite_width*size){
          updates.xPos = this.state.fieldWidth-this.sprite_width*size;
        }
        if(this.state.yPos>this.state.fieldHeight-this.sprite_height*size){
          updates.yPos = this.state.fieldHeight-this.sprite_height*size;
        }

      }
  },


  shrinkCharacter: function(){
    if (this.state.sprite_multiplier<2){
      let size = this.state.sprite_multiplier + 0.1;
      this.setState({sprite_multiplier: size});
    }
    return;
  }

        

  
};

