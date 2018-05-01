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

  cloudPositions = ["6 20 -40", ]


  // cloudTypes = [circleCloud, bigCloud, spikyCloud, fluffyCloud]

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

  generateClouds = () => {
    return [
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getCircle(),
      this.getBig(),
      this.getSpiky(),
      this.getFluff(),
      this.getFluff()
    ]
  }

  getCircle = () => {
    let circleCloud = (
      <a-torus-knot color="white" arc="180" p="3" q="8" radius="1" segments-radial='5' radius-tubular="0.2" position={this.generateStartingPosition()} opacity='.4'>
        <a-animation attribute="rotation"
           dur="20000"
           fill="forwards"
           to='0 0 360'
           repeat="indefinite">
       </a-animation>
     </a-torus-knot>)
    return circleCloud
  }

  getFluff = () => {
    let fluffyCloud = <a-torus-knot color="white" arc="180" p="3" q="23" radius="2" segments-radial='14' segments-tubular="14" radius-tubular="2" position={this.generatePosition()} opacity='.4'></a-torus-knot>
    return fluffyCloud
  }

  getBig = () => {
    let bigCloud = (
    <a-torus-knot color="white" arc="180" p="3" q="6" radius="2" segments-radial='14' radius-tubular="2" position={this.generatePosition()} opacity='.4'>
      <a-animation attribute="position"
         dur="60000"
         fill="forwards"
         to={this.generateEndingPosition()}
         repeat="indefinite">
     </a-animation>
    </a-torus-knot>)
    return bigCloud
  }

  getSpiky = () => {
    let spikyCloud = <a-torus-knot color="white" arc="180" p="3" q="6" radius="2" segments-radial='14' segments-tubular="14" radius-tubular="1" position={this.generatePosition()} opacity='.4'></a-torus-knot>
    return spikyCloud
  }



  switchSource = () => {
    switch (this.props.city.icon) {
      case "fog": case "cloudy": case "partly-cloudy-day": case "partly-cloudy-night":
        return 'IDK'
      case "clear-day": case "clear-night": case "wind":
        return "https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?auto=compress&cs=tinysrgb&h=350"
      case "snow": case "sleet":
        return 'https://images.pexels.com/photos/718857/pexels-photo-718857.jpeg?auto=compress&cs=tinysrgb&h=350'
      case "rain":
        return 'https://images.pexels.com/photos/17739/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
      default:
        return 'https://images.pexels.com/photos/584580/pexels-photo-584580.jpeg?auto=compress&cs=tinysrgb&h=350'
    }
  }

  isItSnowing = () => {
    return (this.props.city.icon === 'snow' || 'sleet') ? <Entity particle-system={{preset: 'snow', particleCount: 800}}/> : null;
  }

  isItRaining = () => {
    return (this.props.city.icon === 'rain' ) ? "count: 4000;" : "count: 0;";
  }


  // snow <Entity particle-system={{preset: 'snow', particleCount: 800}}/>
  // rain   <a-scene rain>
  // clear do nothing
  // clouds figure out!!!

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
      <a-scene rain={this.props.city ? this.isItRaining() : "count: 0;"}>

        <Entity environment={{lightPosition: this.getSunPosition(),
          preset: 'starry',
          skyType: 'atmosphere',
          seed: 1,
          fog: 0.2,
          ground: 'hills',
          groundYScale: 6.31,
          groundColor: '#425E44',
          groundColor2: '#789767',
          groundTexture: 'walkernoise',
          grid: 'none'}}>
        </Entity>

        <Entity primitive="a-light" type="ambient" color="white" />

        {(this.props.city) ? this.isItSnowing() : null}

        <Entity events={{click: this.goBack}}
          primitive='a-plane'
          color='black'
          width='1'
          height='1'
          position="-4 2 -4"
          text={{value: 'Exit VR', align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>

        {this.generateClouds()}
        {this.generateClouds()}
        {this.generateClouds()}
        {this.generateClouds()}
        {this.generateClouds()}
        {this.generateClouds()}
        {this.generateClouds()}
        {this.generateClouds()}
        {this.generateClouds()}

        {this.showCityDetails()}

        <Entity primitive="a-camera" >
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </a-scene>

    )
  }
}

export default withRouter(Sun)
