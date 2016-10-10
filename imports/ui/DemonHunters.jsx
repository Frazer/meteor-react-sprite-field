import React, { Component, PropTypes } from 'react';
 

export default class DemonHunters extends Component {
  constructor(props) {
    super(props);

    this.sprite_height= 32;
    this.sprite_width= 32;

    this.outfits = 8;
    this.animation_steps = 3;
    

    this.state = {
      cd: 'D',
      cloth: 0,
      walkpos: 0,
      xPos: 80,
      yPos: 80,
      fieldWidth: 800*0.94,
      fieldHeight: 500*0.94,
      speed: 5,
      sprite_multiplier: 1,
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

        if (keys[67]){// c is pressed
          let cloth = this.state.cloth +1;
          if (cloth==    this.outfits){cloth=0;}
          // this.setState({cloth: cloth});
          updates.cloth = cloth;

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

        
        if (keys[65]){   //A -  AWSD
          if (this.state.xPos-this.state.speed>1){
            updates.cd = 'L';
            updates.xPos = this.state.xPos-this.state.speed;
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;

            
          }else{
            updates.cd = 'L';
            updates.xPos = 0;

          }
        }
        if (keys[87]){  //  W - AWSD
          if (this.state.yPos-this.state.speed>1){
            updates.cd = 'U';
            updates.yPos = this.state.yPos-this.state.speed;
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;

          }else{
            updates.cd = 'U';
            updates.yPos = 0;

          }
        }
        if (keys[68] ){ // D - AWSD
          if ( this.state.xPos<this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier-this.state.speed){
            updates.cd = 'R';
            updates.xPos = this.state.xPos+this.state.speed;
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;

            
          }else{
            updates.cd = 'R';
            updates.xPos = this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier;

          }
        }
        if (keys[83] ){  // S - AWSD
          if(this.state.yPos<this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier-this.state.speed){
            updates.cd = 'D';
            updates.yPos = this.state.yPos+this.state.speed;
            updates.walkpos =  (this.state.walkpos+1)% this.animation_steps;

            
          }else{
            updates.cd = 'D';
            updates.yPos = this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier;

          }
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

    let characterTransform = {
      left : this.state.xPos,
      top: this.state.yPos,

      transform: "scale(" + this.state.sprite_multiplier + ")",
      transformOrigin: '0 0',
      MozTransform: "scale(" + this.state.sprite_multiplier + ")",
      MozTransformOrigin: '0 0',
      WebkitTransform: "scale(" + this.state.sprite_multiplier + ")",
      WebkitTransformOrigin: '0 0',
      Otransform: "scale(" + this.state.sprite_multiplier + ")",
      OTransformOrigin: '0 0',
      msTransform: "scale(" + this.state.sprite_multiplier + ")",
      msTransformOrigin: '0 0',
      
    } 
      


    let character="good_guys-"+charIDcol+"-"+charIDrow+"-"+ this.state.cd +"-"+ this.state.walkpos;
    return (
            <div className={character} style={characterTransform}></div>
    );
  }
}

DemonHunters.propTypes = {
  keys:              PropTypes.object,
}