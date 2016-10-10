import React, { Component, PropTypes } from 'react';
 

export default class SuperGirl extends Component {
  constructor(props) {
    super(props);

    this.sprite_height= 123;
    this.sprite_width=123;

    this.outfits = 1;
    this.animation_steps = 8;
    this.characterType = 'super_girl';    

    
    this.downKey=75;  // K - JIKL
    this.upKey=73;  //  I
    this.leftKey=74;   //J
    this.rightKey=76; // L

    this.state = {
      cd: 'D',
      cloth: 0,
      walkpos: 0,
      xPos: 0,
      yPos: 0,
      fieldWidth: 800*0.94,
      fieldHeight: 500*0.94,
      speed: 12,
      sprite_multiplier: 0.5,
    };

  }


  componentDidMount() {
    this.gameLooper = setInterval(() => {
      this.updateFrame();
    }, 50);
  }
  
  componentWillUnmount() {
    clearInterval(this.gameLooper);
  }


  updateFrame() {
      let keys = this.props.keys;
      let updates = {};
      //console.log(key);

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

        if (keys[this.downKey] ){  // D
          walkDiag = -1;

          if(this.state.yPos<this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier-this.state.speed){
            updates.cd = 'D';
            yPosChange = this.state.speed;
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;            
          }else{
            updates.cd = 'D';
            updates.yPos = this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier;

          }
        }
        if (keys[this.upKey]){  //  U
          walkDiag = -1;
          if (this.state.yPos-this.state.speed>1){
            updates.cd = 'U';
            yPosChange = -this.state.speed;
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;

          }else{
            updates.cd = 'U';
            updates.yPos = 0;

          }
        }
        
        if (keys[this.leftKey]){   //L -L/R/U/P
          walkDiag *= -1;
          if (this.state.xPos-this.state.speed>1){
            updates.cd = 'L';
            xPosChange = -this.state.speed;
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;

            
          }else{
            updates.cd = 'L';
            updates.xPos = 0;

          }
        }
        if (keys[this.rightKey] ){ // R
          walkDiag *= -1;
          if ( this.state.xPos<this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier-this.state.speed){
            updates.cd = 'R';
            xPosChange = this.state.speed;
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;

            
          }else{
            updates.cd = 'R';
            updates.xPos = this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier;

          }
        }

        if (walkDiag == 1){
          updates.xPos = this.state.xPos+xPosChange*0.7;
          updates.yPos = this.state.yPos+yPosChange*0.7;
        }else{
          updates.xPos = this.state.xPos+xPosChange;
          updates.yPos = this.state.yPos+yPosChange;
        }

        if (updates.walkpos ==  this.animation_steps){updates.walkpos = 0;}
        //console.log(updates);
        if(Object.keys(updates).length ){
          this.setState(updates);
        }
        
  }



  render() {
    let charIDcol = this.state.cloth %4;
    let charIDrow = ~~(this.state.cloth /4);

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

SuperGirl.propTypes = {
  keys:              PropTypes.object,
}