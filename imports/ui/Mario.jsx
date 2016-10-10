import React, { Component, PropTypes } from 'react';
 

export default class Mario extends Component {
  constructor(props) {
    super(props);

    this.sprite_height= 40;
    this.sprite_width= 28;

    this.outfits = 2;
    this.animation_steps = 3;
    

    this.state = {
      cd: 'D',
      cloth: 0,
      walkpos: 0,
      xPos: 40,
      yPos: 40,
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

        if (keys[67]){// c is pressed
          let cloth = this.state.cloth +1;
          if (cloth==    this.outfits){cloth=0;}
          this.setState({cloth: cloth});
          return;
        }

        if (keys[189] || keys[173]){// - is pressed
          let size = this.state.sprite_multiplier ;
          if (this.state.sprite_multiplier>0.1){
            size = this.state.sprite_multiplier - 0.1;
          }else{
            size = this.state.sprite_multiplier / 2;
          }
          
          this.setState({sprite_multiplier: size});
          return;
        }


        if (keys[187] || keys[61]){// + is pressed


          if (this.state.sprite_multiplier<2){
            let size = this.state.sprite_multiplier + 0.1;
            this.setState({sprite_multiplier: size});
          }
          return;
        }

        
        if (keys[37]){
          if (this.state.xPos-this.state.speed>1){
            this.setState({cd: 'L', xPos: this.state.xPos-this.state.speed, 
                 walkpos: (this.state.walkpos+1)% this.animation_steps});
            return;
          }else{
            this.setState({cd: 'L', xPos: 0});
            return;
          }
        }
        if (keys[38]){
          if (this.state.yPos-this.state.speed>1){
            this.setState({cd: 'U' , yPos: this.state.yPos-this.state.speed, 
              walkpos: (this.state.walkpos+1)%this.animation_steps});
            return;
          }else{
            this.setState({cd: 'U' , yPos: 0});
            return;
          }
        }
        if (keys[39] ){
          if ( this.state.xPos<this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier-this.state.speed){
            this.setState({cd: 'R', xPos: this.state.xPos+this.state.speed, 
              walkpos: (this.state.walkpos+1)%this.animation_steps});
            return;
          }else{
            this.setState({cd: 'R', xPos: this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier});
            return;
          }
        }
        if (keys[40] ){
          if(this.state.yPos<this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier-this.state.speed){
            this.setState({cd: 'D', yPos: this.state.yPos+this.state.speed, 
              walkpos: (this.state.walkpos+1)%this.animation_steps});
            return;
          }else{
            this.setState({cd: 'D', yPos: this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier});
            return;
          }
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
      


    let character="mario-"+charIDcol+"-"+charIDrow+"-"+ this.state.cd +"-"+ this.state.walkpos;
    return (
            <div className={character} style={characterTransform}></div>
    );
  }
}


Mario.propTypes = {
  keys:              PropTypes.object,
}