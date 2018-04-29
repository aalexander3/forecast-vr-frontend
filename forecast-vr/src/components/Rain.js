import React from 'react'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import 'aframe-rain'
import 'aframe-sun-sky'

class Rain extends React.Component {

  rain_palette = ["231 232 232", "219 230 229", "205 220 220", "175 195 197", "76 77 83", "210 216 216"]

  getColors = () => {
    return "shader: gradient; topColor: " + this.rain_palette[4] + "; bottomColor: " + this.rain_palette[5] + ";"
  }


  render(){
    return(
      <a-scene rain>
        <a-assets>
          <img id='sunTexture' src='https://stereo.gsfc.nasa.gov/img/stereoimages/preview/euvisdoCarringtonMap.jpg' />
        </a-assets>

          {/* <a-gradient-sky material="shader: gradient; topColor: 205 220 220; bottomColor: 76 77 83;"> */}
          <a-sun-sky material="sunPosition: -0.5 0.5 -5">
            <a-entity id="orbit">
              <a-animation attribute="rotation" from="0 0 0" to="0 360 0" dur="5000"
                          repeat="indefinite" easing="linear"></a-animation>
            </a-entity>
          </a-sun-sky>
        {/* </a-gradient-sky> */}

        <Entity primitive="a-light" type="ambient" color="#white"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 8 -10"/>
        {/* <Entity particle-system={{preset: 'rain', particleCount: 800}}/> */}
        {/* <a-sphere src='#sunTexture' position="2 8 -10" rotation="45 0 0" scale=".25 .25 .25" opacity='0.3'></a-sphere> */}
        {/* <a-ring color="white" radius-inner=".26" radius-outer=".28" position="2 8 -10" opacity='.3' ></a-ring> */}

        <Entity primitive="a-camera" >
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </a-scene>
    )
  }
}

export default Rain
