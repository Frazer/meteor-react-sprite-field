import React, { Component } from 'react';
 

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    this.sprite_height= 123;
    this.sprite_width=123;
    

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
    window.addEventListener("keydown", this.keyListener.bind(this), true);

  }

  keyListener(e) {
      let key = e.keyCode ? e.keyCode : e.which;

      console.log(key);

        if (key === 67){// c is pressed
          let cloth = this.state.cloth +1;
          if (cloth==8){cloth=0;}
          this.setState({cloth: cloth});
          return;
        }

        if (key === 189 || key === 173){// - is pressed
          let size = this.state.sprite_multiplier ;
          if (this.state.sprite_multiplier>0.1){
            size = this.state.sprite_multiplier - 0.1;
          }else{
            size = this.state.sprite_multiplier / 2;
          }
          
          this.setState({sprite_multiplier: size});
          return;
        }


        if (key === 187 || key === 61){// + is pressed


          if (this.state.sprite_multiplier<2){
            let size = this.state.sprite_multiplier + 0.1;
            this.setState({sprite_multiplier: size});
          }
          return;
        }

        
        if (key === 37){
          if (this.state.xPos-this.state.speed>1){
            this.setState({cd: 'L', xPos: this.state.xPos-this.state.speed, walkpos: (this.state.walkpos+1)%8});
            return;
          }else{
            this.setState({cd: 'L', xPos: 0});
            return;
          }
        }
        if (key === 38){
          if (this.state.yPos-this.state.speed>1){
            this.setState({cd: 'U' , yPos: this.state.yPos-this.state.speed, walkpos: (this.state.walkpos+1)%8});
            return;
          }else{
            this.setState({cd: 'U' , yPos: 0});
            return;
          }
        }
        if (key === 39 ){
          if ( this.state.xPos<this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier-this.state.speed){
            this.setState({cd: 'R', xPos: this.state.xPos+this.state.speed, walkpos: (this.state.walkpos+1)%8});
            return;
          }else{
            this.setState({cd: 'R', xPos: this.state.fieldWidth-this.sprite_width*this.state.sprite_multiplier});
            return;
          }
        }
        if (key === 40 ){
          if(this.state.yPos<this.state.fieldHeight-this.sprite_height*this.state.sprite_multiplier-this.state.speed){
            this.setState({cd: 'D', yPos: this.state.yPos+this.state.speed, walkpos: (this.state.walkpos+1)%8});
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
      


    let character="super_girl-"+charIDcol+"-"+charIDrow+"-"+ this.state.cd +"-"+ this.state.walkpos;
    return (
      <div className="container">
        <header>
          <h1 className="neon">Frazzle Land</h1>
        </header>
        <div className="field_border">

          <div className="field">
            <div className={character} style={characterTransform}></div>
          </div>      
        </div>

      </div>
    );
  }
}