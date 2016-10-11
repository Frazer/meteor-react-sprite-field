import React, { Component, PropTypes } from 'react';
 

//////  An attempt to abstract character control to simplify multiple characters

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

