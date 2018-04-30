import React from 'react'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import 'aframe-environment-component'


class Snow extends React.Component {

  render(){
    return(
      <a-scene >
        <a-entity environment="
        preset: starry;
        skyType: atmosphere;
        seed: 2;
        lightPosition: -.5, .3, -1.4;
        fog: 0.2;
        ground: hills;
        groundYScale: 6.31;
        groundColor: #B17F6C;
        groundColor2: #705F60;
        groundTexture: walkernoise;
        grid: none">
        </a-entity>

      <Entity particle-system={{preset: 'snow', particleCount: 800}}/>
      <Entity primitive="a-light" type="ambient" color="white" />

      <Entity primitive="a-camera" >
        <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
      </Entity>
    </a-scene>
    )
  }
}

export default Snow
