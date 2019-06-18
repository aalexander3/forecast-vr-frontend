// react imports
import React from 'react'
// aframe imports
import 'aframe';
import 'aframe-animation-component';
import 'babel-polyfill';

class Cloud extends React.Component {

  generateStartingPosition = () => {
    let x =  Math.random() * (140) -70;
    let y =  Math.random() * (60 - 15) + 15;
    let z =  Math.random() * (140) -70;
    return `${x} ${y} ${z}`
  }

  generateEndingPosition = () => {
    let x =  Math.random() * (140);
    let y =  Math.random() * (60 - 15) + 15;
    let z =  Math.random() * (140) -70;
    return `${x} ${y} ${z}`
  }

  generateSize = () => {
    let x =  Math.random() * (3);
    let y =  Math.random() * (3);
    let z =  Math.random() * (3);
    return `${x} ${y} ${z}`
  }

  generateClouds = () => {
    return [
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getBig(),
      this.getBig(),
      this.getSpiky(),
      this.getSpiky(),
      this.getFluff(),
      this.getFluff(),
      this.getFluff(),
      this.getFluff()
    ]
  }

  getCircle = () => {
    let circleCloud = (
      <a-torus-knot scale={this.generateSize()} color="white" arc="180" p="3" q="8" radius="1.2" segments-radial='5' radius-tubular="0.3" position={this.generateStartingPosition()} opacity='.4'>
        <a-animation attribute="rotation"
           dur="20000"
           fill="forwards"
           to='0 0 360'
           direction='alternate-reverse'
           repeat="indefinite">
       </a-animation>
     </a-torus-knot>)
    return circleCloud
  }

  getFluff = () => {
    let fluffyCloud = (
      <a-torus-knot scale={this.generateSize()} color="white" arc="180" p="3" q="23" radius="2" segments-radial='14' segments-tubular="14" radius-tubular="2" position={this.generateStartingPosition()} opacity='.4'>
        <a-animation attribute="scale"
           dur="20000"
           fill="forwards"
           to={this.generateSize()}
           direction='alternate-reverse'
           repeat="indefinite">
       </a-animation>
      </a-torus-knot>)
    return fluffyCloud
  }

  getBig = () => {
    let bigCloud = (
    <a-torus-knot scale={this.generateSize()} color="white" arc="180" p="3" q="6" radius="2" segments-radial='14' radius-tubular="2" position={this.generateStartingPosition()} opacity='.4'>
      <a-animation attribute="position"
         dur="60000"
         fill="forwards"
         to={this.generateEndingPosition()}
         direction='alternate-reverse'
         repeat="indefinite">
     </a-animation>
    </a-torus-knot>)
    return bigCloud
  }

  getSpiky = () => {
    let spikyCloud = (
      <a-torus-knot scale={this.generateSize()} color="white" arc="180" p="3" q="6" radius="2" segments-radial='14' segments-tubular="14" radius-tubular="1" position={this.generateStartingPosition()} opacity='.4'>
        <a-animation attribute="material.color"
           dur="10000"
           from='#F4DFE4'
           to='#F9EBDB'
           direction='alternate-reverse'
           repeat="indefinite">
       </a-animation>
      </a-torus-knot>)
    return spikyCloud
  }

  render(){
    return this.generateClouds()
  }
}


export default Cloud
