import React, { Component } from 'react';
 

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cd: 'D',
      cloth: 0,
      walkpos: 0,
      xPos: 0,
      yPos: 0,
      fieldWidth: 800*0.94-32,
      fieldHeight: 500*0.94-32,
      speed: 8,
      sprite_size: 32,
    };
    window.addEventListener("keydown", this.keyListener.bind(this), true);

  }

  keyListener(e) {
      let key = e.keyCode ? e.keyCode : e.which;


        if (key === 67){// c is pressed
          let cloth = this.state.cloth +1;
          if (cloth==8){cloth=0;}
          this.setState({cloth: cloth});
          return;
        }


        
        if (key === 37){
          if (this.state.xPos-this.state.speed>1){
            this.setState({cd: 'L', xPos: this.state.xPos-this.state.speed, walkpos: (this.state.walkpos+1)%3});
            return;
          }else{
            this.setState({cd: 'L', xPos: 0});
            return;
          }
        }
        if (key === 38){
          if (this.state.yPos-this.state.speed>1){
            this.setState({cd: 'U' , yPos: this.state.yPos-this.state.speed, walkpos: (this.state.walkpos+1)%3});
            return;
          }else{
            this.setState({cd: 'U' , yPos: 0});
            return;
          }
        }
        if (key === 39 ){
          if ( this.state.xPos<this.state.fieldWidth-this.state.speed){
            this.setState({cd: 'R', xPos: this.state.xPos+this.state.speed, walkpos: (this.state.walkpos+1)%3});
            return;
          }else{
            this.setState({cd: 'R', xPos: this.state.fieldWidth});
            return;
          }
        }
        if (key === 40 ){
          if(this.state.yPos<this.state.fieldHeight-this.state.speed){
            this.setState({cd: 'D', yPos: this.state.yPos+this.state.speed, walkpos: (this.state.walkpos+1)%3});
            return;
          }else{
            this.setState({cd: 'D', yPos: this.state.fieldHeight});
            return;
          }
        }
        
  }
 
  render() {
    let charIDcol = this.state.cloth %4;
    let charIDrow = ~~(this.state.cloth /4);

    let charPos = {
      left : this.state.xPos,
      top: this.state.yPos,
    } 
      


    let character="sprite character-"+charIDcol+"-"+charIDrow+"-"+ this.state.cd +"-"+ this.state.walkpos;
    return (
      <div className="container">
        <header>
          <h1 className="neon">Frazzle Land</h1>
        </header>
        <div className="field_border">

          <div className="field">
            <div className={character} style={charPos}></div>
          </div>      
        </div>

      </div>
    );
  }
}