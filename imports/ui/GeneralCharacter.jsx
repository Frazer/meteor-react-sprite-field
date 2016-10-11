import React, { Component, PropTypes } from 'react';
 

export default class GeneralCharacter extends Component {
  constructor(props) {
    super(props);


    this.characterType = this.props.data.config.characterType;

    this.outfits = this.props.data.config.outfits;
    this.animation_steps = this.props.data.config.animation_steps;
    this.sprite_height = this.props.data.config.sprite_height;
    this.sprite_width = this.props.data.config.sprite_width;
    this.canChangeClothes = this.props.data.config.canChangeClothes;
    this.charactersPerRowInSpriteMap = this.props.data.config.charactersPerRowInSpriteMap;
    this.animates_diagonally =  this.props.data.config.animates_diagonally;

    this.stepTime = 300/this.animation_steps;


    this.state = {
      cd: 'D',
      cloth: 0,
      walkpos: 0,
      fieldWidth: 800*0.94,
      fieldHeight: 500*0.94,
      lastClothChange: 0,
      lastStepChange: 0,


    
      downKey: this.props.data.controls.downKey,  // K - JIKL
      upKey: this.props.data.controls.upKey,  //  I
      leftKey: this.props.data.controls.leftKey,   //J
      rightKey: this.props.data.controls.rightKey, // L
    
      xPos: this.props.data.position.xPos,
      yPos: this.props.data.position.yPos,
      speed: this.props.data.config.speed,
      sprite_multiplier: this.props.data.config.sprite_multiplier,
    
    };

    this.updateFrame = this.updateFrame.bind(this);
    
  }


  componentWillReceiveProps(props) {
    this.updateFrame(props.ticker);
  }

  updateFrame(ticker) {
      let keys = this.props.keys;
      let updates = {};
      let timeNow = ticker.time;

        if (this.canChangeClothes && keys[67]){// c is pressed
          
          let cloth = this.state.cloth;
          if (timeNow - this.state.lastClothChange  > 300){
            if (this.animates_diagonally){
              cloth = cloth +2;
            }else{
              cloth = cloth +1;
            }

            if (cloth>=    this.outfits){cloth=cloth-this.outfits;}
            updates.cloth = cloth;
            updates.lastClothChange = timeNow;

          }  
            
        }

        if (keys[189] || keys[173]){// - is pressed
          let size = this.state.sprite_multiplier ;
          if (this.state.sprite_multiplier>0.1){
            size = this.state.sprite_multiplier - 0.1;
          }else{
            size = this.state.sprite_multiplier / 2;
          }
          updates.sprite_multiplier = size;
          //this.setState({sprite_multiplier: size});
          
        }


        if (keys[187] || keys[61]){// + is pressed


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
 
        }

        let walkDiag =0;

        let yPosChange = 0;
        let xPosChange = 0;
        let walkposFlag = false;

        if (keys[this.state.downKey] ){  // D
          walkDiag = -1;

          if(this.state.yPos<this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier-this.state.speed){
            updates.cd = 'D';
            yPosChange = this.state.speed;
            walkposFlag =  true;            
          }else{
            updates.cd = 'D';
            updates.yPos = this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier;

          }
        }
        if (keys[this.state.upKey]){  //  U
          walkDiag = -1;
          if (this.state.yPos-this.state.speed>1){
            updates.cd = 'U';
            yPosChange = -this.state.speed;
            walkposFlag =  true;

          }else{
            updates.cd = 'U';
            updates.yPos = 0;

          }
        }
        
        if (keys[this.state.leftKey]){   //L -L/R/U/P
          walkDiag *= -1;
          if (this.state.xPos-this.state.speed>1){
            updates.cd = 'L';
            xPosChange = -this.state.speed;
            walkposFlag =  true;

            
          }else{
            updates.cd = 'L';
            updates.xPos = 0;

          }
        }
        if (keys[this.state.rightKey] ){ // R
          walkDiag *= -1;
          if ( this.state.xPos<this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier-this.state.speed){
            updates.cd = 'R';
            xPosChange = this.state.speed;
            walkposFlag =  true;

            
          }else{
            updates.cd = 'R';
            updates.xPos = this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier;

          }
        }

        if (this.animates_diagonally){

          if (keys[this.state.rightKey] && keys[this.state.upKey]){updates.cd = 'U';}   // correct for sprite L/R icon over-writing correct image
          if (keys[this.state.downKey] && keys[this.state.leftKey]){updates.cd = 'D';}
        }

        xPosChange = xPosChange * ticker.dt *64 ;  // 60 frames a second << 6 means multply by 2^6
        yPosChange = yPosChange * ticker.dt *64 ;

        if (walkDiag == 1){
          if (this.animates_diagonally && !this.state.animatingDiagonally){      
            updates.cloth = this.state.cloth+1; 
            updates.animatingDiagonally =true;
          }
          updates.xPos = this.state.xPos+xPosChange*0.7;
          updates.yPos = this.state.yPos+yPosChange*0.7;
        }else{
          if (this.animates_diagonally && this.state.animatingDiagonally){      
            updates.cloth = this.state.cloth-1; 
            updates.animatingDiagonally =false;
          }
          updates.xPos = this.state.xPos+xPosChange;
          updates.yPos = this.state.yPos+yPosChange;
        }

        if(walkposFlag){
          if (timeNow - this.state.lastStepChange  > this.stepTime){
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;
            updates.lastStepChange = timeNow;
          }  
        } 
        //console.log(updates);
        if(Object.keys(updates).length ){
          this.setState(updates);
        }
        
  }

  render() {
    let charIDcol = this.state.cloth % this.charactersPerRowInSpriteMap;
    let charIDrow = ~~(this.state.cloth / this.charactersPerRowInSpriteMap );

    let scaleString ="scale(" + this.state.sprite_multiplier + ")"

    let characterTransform = {
      left : this.state.xPos,
      top: this.state.yPos,


      transform: scaleString,
      transformOrigin: '0 0',
      MozTransform: scaleString,
      MozTransformOrigin: '0 0',
      WebkitTransform: scaleString,
      WebkitTransformOrigin: '0 0',
      Otransform: scaleString,
      OTransformOrigin: '0 0',
      msTransform: scaleString,
      msTransformOrigin: '0 0',
      
    } 
    

    let character=this.characterType+"-"+charIDcol+"-"+charIDrow+"-"+ this.state.cd +"-"+ this.state.walkpos;
    return (
            <div className={character} style={characterTransform}></div>
    );
  }
}

GeneralCharacter.propTypes = {
  keys:              PropTypes.object,
  // config:            PropTypes.object,
  // position:          PropTypes.object,
  // controls:          PropTypes.object,
  data:              PropTypes.object,
  ticker:            PropTypes.object,



}




export const Mario =  {

    characterType : 'mario',

    outfits:  2,
    animation_steps:  3,
    sprite_height:  40,
    sprite_width:  28,

    speed:  5,
    sprite_multiplier:  1,

    animates_diagonally: true,
    canChangeClothes: false,

    charactersPerRowInSpriteMap: 2,
};

export const GoodGuys =  {

    characterType : 'good_guys',

    outfits:  8,
    animation_steps:  3,
    sprite_height:  32,
    sprite_width:  32,

    speed:  6,
    sprite_multiplier:  1.2,

    animates_diagonally: false,

    canChangeClothes: true,

    charactersPerRowInSpriteMap: 4,
};

export const SuperGirl = {

    characterType : 'super_girl',

    outfits:  1,
    animation_steps:  8,
    sprite_height:  123,
    sprite_width:  123,

    speed:  5,
    sprite_multiplier:  0.4,

    animates_diagonally: false,

    canChangeClothes: false,

    charactersPerRowInSpriteMap: 1,

}
