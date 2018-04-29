import React from 'react'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';

class Rain extends React.Component {

  rain_palette = ["231 232 232", "219 230 229", "205 220 220", "175 195 197", "76 77 83", "210 216 216"]

  getColors = () => {
    return "shader: gradient; topColor: " + this.rain_palette[3] + "; bottomColor: " + this.rain_palette[4] + ";"
  }

  render(){
    return(
      <a-scene>
        <a-assets>
          <img id='sunTexture' src='https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=47d596252f08d70d845dfe0ef4fb0388&auto=format&fit=crop&w=500&q=60' />
        </a-assets>

        <Entity primitive="a-light" type="ambient" color="#white"/>
        <Entity primitive="a-light" type="point" intensity="2" position="3 6 -10"/>
        {<a-gradient-sky material={this.getColors()}></a-gradient-sky>}
        <Entity particle-system={{preset: 'rain', particleCount: 1000}}/>
        <a-sphere src='#sunTexture' position="2 20 -5" rotation="0 45 45" scale=".25 .25 .25" opacity='0.5'></a-sphere>

        <Entity primitive="a-camera" position="0 1.6 2">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </a-scene>
    )
  }
}

export default Rain
