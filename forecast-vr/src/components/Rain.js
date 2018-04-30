import React from 'react'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity } from 'aframe-react';
import 'aframe-rain'
import 'aframe-sun-sky'
import 'aframe-environment-component'

class Rain extends React.Component {

  rain_palette = ["231 232 232", "219 230 229", "205 220 220", "175 195 197", "76 77 83", "210 216 216"]

  getColors = () => {
    return "shader: gradient; topColor: " + this.rain_palette[4] + "; bottomColor: " + this.rain_palette[5] + ";"
  }


  render(){
    return(
      <a-scene rain>
        <a-entity environment="
        preset: starry;
        skyType: atmosphere;
        seed: 1;
        lightPosition: -0.3, .5, -1.4;
        fog: 0.2;
        ground: hills;
        groundYScale: 6.31;
        groundColor: #B17F6C;
        groundColor2: #705F60;
        groundTexture: walkernoise;
        grid: none">
        </a-entity>

        <Entity primitive="a-light" type="ambient" color="white" />

        <Entity primitive="a-camera" >
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>

      </a-scene>
    )
  }
}

export default Rain
