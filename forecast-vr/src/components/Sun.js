import React from 'react'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import 'aframe-rain'
import 'aframe-environment-component'
import { withRouter } from 'react-router-dom'
import 'aframe-html-shader'

class Sun extends React.Component {

  generatePosition = () => {
    let x =  Math.random() * (140) -70;
    let y =  Math.random() * (60 - 15) + 15;
    let z =  Math.random() * (140) -70;
    return `${x} ${y} ${z}`
  }

  generateStartingPosition = () => {
    let x =  Math.random() * (140) -70;
    let y =  Math.random() * (60 - 15) + 15;
    let z =  Math.random() * (140) -70;
    return `${x} ${y} ${z}`
  }

  generateEndingPosition = () => {
    let x =  Math.random() * (140) ;
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
      <a-torus-knot scale={this.generateSize()} color="white" arc="180" p="3" q="23" radius="2" segments-radial='14' segments-tubular="14" radius-tubular="2" position={this.generatePosition()} opacity='.4'>
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
    <a-torus-knot scale={this.generateSize()} color="white" arc="180" p="3" q="6" radius="2" segments-radial='14' radius-tubular="2" position={this.generatePosition()} opacity='.4'>
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
      <a-torus-knot scale={this.generateSize()} color="white" arc="180" p="3" q="6" radius="2" segments-radial='14' segments-tubular="14" radius-tubular="1" position={this.generatePosition()} opacity='.4'>
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

  getGroundColor1 = () => {
    if (this.props.city) {
      switch (this.props.city.icon) {
        case "fog": case "cloudy": case "partly-cloudy-day": case "partly-cloudy-night":
          return '#797278'
        case "clear-day": case "clear-night": case "wind":
          return '#425E44'
        case "snow": case "sleet":
          return '#E7EBF0'
        case "rain":
          return '#C1C8D9'
        default:
          return '#425E44'
      }
    }
  }

  getGroundColor2 = () => {
    if (this.props.city) {
      switch (this.props.city.icon) {
        case "fog": case "cloudy": case "partly-cloudy-day": case "partly-cloudy-night":
          return '#789767'
        case "clear-day": case "clear-night": case "wind":
          return '#789767'
        case "snow": case "sleet":
          return '#E9F6F6'
        case "rain":
          return '#D8E9EE'
        default:
          return '#789767'
      }
    }
  }

  isItSnowing = () => {
    if (this.props.city.icon === "snow" || this.props.city.icon === "sleet" ) {
      return "dropRadius: 0.08; dropHeight: 0.1; vector: 0 -2 0; opacity: .8; splashBounce: 0.8; count: 4000; color: #E7EBF0; splashGravity: 1.6;"
    } else if (this.props.city.icon === 'rain' ) {
        return "count: 4000;"
    } else {
      return 'count: 0;'
    }
  }

  // isItRaining = () => {
  //   return (this.props.city.icon === 'rain' ) ? "count: 4000;" : "count: 0;";
  // }

  howCloudy = () => {
    switch (this.props.city.icon) {
      case "fog": case "cloudy":
        return [
          this.generateClouds(),
          this.generateClouds(),
          this.generateClouds(),
          this.generateClouds()
        ]
        break;
      case "partly-cloudy-day": case "partly-cloudy-night":
      return [
        this.generateClouds(),
        this.generateClouds(),
        this.generateClouds()
      ]
        break;
      case "clear-day": case "clear-night": case "wind":
        this.generateClouds()
        break;
      case "snow": case "sleet":
      return [
        this.generateClouds(),
        this.generateClouds()
      ]
        break;
      case "rain":
      return [
        this.generateClouds(),
        this.generateClouds()
      ]
        break;
      default:
      return [
        this.generateClouds(),
        this.generateClouds()
      ]
        break;
    }
  }

  getSunPosition = () => {
    if (this.props.city) {
      switch (this.props.city.time.slice(0,2)) {
        case "06":
          return {x: -2.0, y: 0, z: -1.4}
        case "07":
          return {x: -1.75, y: 0.25, z: -1.4}
        case "08":
          return {x: -1.5, y: 0.5, z: -1.4}
        case "09":
          return {x: -1.25, y: 0.75, z: -1.4}
        case "10":
          return {x: -1, y: 1, z: -1.4}
        case "11":
          return {x: -.75, y: 1.25, z: -1.4}
        case "12":
          return {x: -.5, y: 1.5, z: -1.4}
        case "13":
          return {x: 0, y: 2, z: -1.4}
        case "14":
          return {x: .25, y: 1.75, z: -1.4}
        case "15":
          return {x: .5, y: 1.5, z: -1.4}
        case "16":
          return {x: .75, y: 1.25, z: -1.4}
        case "17":
          return {x: 1.0, y: .9, z: -1.4}
        case "18":
          return {x: 1.25, y: 0.65, z: -1.4}
        case "19":
          return {x: 1.5, y: 0.3, z: -1.4}
        case "20":
          return {x: 1.75, y: 0, z: -1.4}
        default:
          return {x: -2.0, y: -2.0, z: -1.4}
      }
    }
  }

  goBack = () => {
    this.props.history.replace('/')
  }

  showCityDetails = () => {
    if (this.props.city){
      return (
        <Entity
          primitive='a-plane'
          color='red'
          width='1'
          height='1'
          position="4 2 -4"
          text={{value: `Currently in \n ${this.props.city.full_city_name}: \n ${this.props.city.temp} F  \n ${this.props.city.conditions}`, align: 'center', wrapCount: 14, side: 'double'}}
          opacity='.6'>
        </Entity>
      )
    }
  }

  render(){

    (this.props.city) ? console.log(this.props.city) : null;

    return(
      <a-scene rain={this.props.city ? this.isItSnowing() : "count: 0;"}>
      {/* <a-scene rain="dropRadius: 0.08; dropHeight: 0.1; vector: 0 -2 0; opacity= .8; splashBounce: 0.8; count: 4000; color: #E7EBF0; splashGravity: 1.6" > */}

      {/* <a-scene> */}
        <Entity environment={{lightPosition: this.getSunPosition(),
          preset: 'starry',
          skyType: 'atmosphere',
          seed: 1,
          fog: 0.2,
          ground: 'hills',
          groundYScale: 6.31,
          groundColor: this.getGroundColor1(),
          groundColor2: this.getGroundColor2(),
          groundTexture: 'walkernoise',
          grid: 'none'}}>
        </Entity>

        <Entity primitive="a-light" type="ambient" color="white" intensity=".2"/>

        {(this.props.city) ? this.isItSnowing() : null}
        {(this.props.city) ? this.howCloudy() : null}
        {this.showCityDetails()}

        <Entity events={{click: this.goBack}}
          primitive='a-plane'
          color='black'
          width='1'
          height='1'
          position="-4 2 -4"
          text={{value: 'Exit VR', align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>

        <Entity primitive="a-camera" >
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </a-scene>

    )
  }
}

export default withRouter(Sun)
