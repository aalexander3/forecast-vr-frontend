import React from 'react'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import 'aframe-rain'
import 'aframe-sun-sky'
import 'aframe-environment-component'


class Storm extends React.Component {

  render(){
    return(
      <a-scene >
        <a-entity environment="
        preset: starry;
        skyType: atmosphere;
        seed: 3;
        lightPosition: 0.5, .4, -1.4;
        fog: 0.9;
        ground: hills;
        groundYScale: 6.31;
        groundColor: #B17F6C;
        groundColor2: #705F60;
        groundTexture: walkernoise;
        grid: none">
        </a-entity>

      <Entity particle-system={{preset: 'snow', particleCount: 1000}}/>
      <Entity primitive="a-light" type="ambient" color="white" />

      <Entity primitive="a-camera" >
        <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
      </Entity>
    </a-scene>
    )
  }
}

export default Storm
