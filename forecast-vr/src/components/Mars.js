// react imports
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { fixOffset } from '../actions/actions.js'
import CityButtons from './CityButtons'
import Cloud from './Cloud'
// aframe imports
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import 'aframe-rain'
import 'aframe-environment-component'
import 'aframe-html-shader'

class Sun extends React.Component {

  getSunPosition = () => {
    if (this.props.city) {
      let hourlyTime = this.props.city.hourly[0].time
      let offset = this.props.city.offset
      let timeToUse = fixOffset(hourlyTime, offset).toTimeString().slice(0,2)

      switch (timeToUse) {
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



  getCityPosition = (xButton) => {
    return `${xButton} 1 -8`
  }

  makeLocationButtons = () => {
    let xButton = -9;
    let i = 0

    return this.props.locations.map(city => {
      xButton++;
      i++;
      return <CityButtons city={city} color={this.randomizeColor(i)} position={this.getCityPosition(xButton)} goToCity={this.goToCity}/>
    })
  }

  randomizeColor = (i) => {
    let colors = ['#BFDDE1', '#99C6D8', '#AAB89B', '#D7D1AC', '#E9DCD1', '#E5E4E3', '#BFDDE1', '#99C6D8', '#AAB89B', '#D7D1AC', '#E9DCD1', '#E5E4E3', '#BFDDE1', '#99C6D8', '#AAB89B', '#D7D1AC', '#E9DCD1', '#E5E4E3', '#BFDDE1', '#99C6D8', '#AAB89B', '#D7D1AC', '#E9DCD1', '#E5E4E3' ]
    return colors[i]
  }

  goToCity = (city) => {
    this.props.history.replace(`/${city.citySlug}`)
  }

  goBack = () => {
    this.props.history.replace('/')
  }

  showCityDetails = () => {
      return (
        <Entity
          primitive='a-plane'
          color='#E2A596'
          width='1'
          height='1'
          position="-10 1 -8"
          text={{value: `Currently on \n Mars: \n Clear`, align: 'center', wrapCount: 14, side: 'double'}}
          opacity='.6'>
        </Entity>
      )
  }

  render(){

    return(
      <a-scene rain="depthDensity: 0.1; count: 6000; dropRadius: 0.05; vector: 5 -.01 0; height: 6; dropHeight: 0.2; color: #C66344">

        <Entity environment={{lightPosition: this.getSunPosition(),
          preset: 'yavapai',
          skyType: 'gradient',
          skyColor: '#44426A',
          horizonColor: '#cfe0af',
          seed: 1,
          fog: 0.2,
          shadow: true,
          ground: 'canyon',
          groundYScale: 6.31,
          groundColor: '#C8B1A2',
          groundColor2: '#C66344',
          groundTexture: 'walkernoiuise',
          dressing: 'stones',
          grid: 'none'}}>
        </Entity>



        <Entity primitive="a-light" type="ambient" color="white" intensity=".2"/>

        <a-image position='-4 2 -10' scale='3 3 3' src='/images/material_20.png'>
          <a-animation attribute="position"
             dur="10000"
             fill="forwards"
             to='10 20 -15'
             direction='alternate-reverse'
             repeat="indefinite">
         </a-animation>
         <a-animation attribute="rotation"
            dur="3000"
            fill="forwards"
            to='180 0 270'
            direction='alternate-reverse'
            repeat="indefinite">
        </a-animation>
        </a-image>

        {this.showCityDetails()}
        {(this.props.locations) ? this.makeLocationButtons() : null}

        <Entity events={{click: this.goBack}}
          primitive='a-plane'
          color='black'
          width='1'
          height='1'
          position="-11 1 -8"
          text={{value: 'Exit VR', align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>

        <a-entity collada-model="url(/models/mars/model.dae)" scale="10 10 10" position="-30 0 -55" rotation="0 -5 0"></a-entity>


        <Entity events={{click: this.goBack}}
          primitive='a-plane'
          color='#ECDCB9'
          width='1'
          height='1'
          position="-9 1 -8"
          text={{value: 'Teleport to:', align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>

        <Entity primitive="a-camera" >
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </a-scene>
    )
  }
}

const mapStateToProps = state => {
  return {
    whichHour: state.whichHour,
    locations: state.locations
  }
}

export default compose(withRouter, connect(mapStateToProps))(Sun)
