import React from 'react'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import 'aframe-rain'
import 'aframe-environment-component'

class Sun extends React.Component {

  render(){
    debugger

    return(
        <a-scene>
            <a-entity environment="
            preset: starry;
            skyType: atmosphere;
            seed: 1;
            lightPosition: 2.0, 0.0, -1.4;
            fog: 0.2;
            ground: hills;
            groundYScale: 6.31;
            groundColor: #425E44;
            groundColor2: #789767;
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

export default Sun