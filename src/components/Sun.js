// react imports
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { fixOffset, incrementHour, decrementHour } from '../actions/actions.js'
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

  getGroundColor1 = () => {
    const { city } = this.props
    let icon;
    if (city) icon = city.hourly[this.props.whichHour].icon;

    if (this.props.city) {
      switch (icon) {
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

    const { city } = this.props
    let icon;
    if (city) icon = city.hourly[this.props.whichHour].icon;

    if (this.props.city) {
      switch (icon) {
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
    const { city } = this.props
    let icon;
    if (city) icon = city.hourly[this.props.whichHour].icon;

    if (icon === "snow" || icon === "sleet" ) {
      return "dropRadius: 0.08; dropHeight: 0.1; vector: 0 -2 0; opacity: .8; splashBounce: 0.8; count: 4000; color: #E7EBF0; splashGravity: 1.6;"
    } else if (icon === 'rain' ) {
      return "count: 4000;"
    } else {
      return 'count: 0;'
    }
  }

  makeXClouds = number => {
    return new Array(number).fill(<Cloud />)
  }

  howCloudy = () => {
    const { city } = this.props
    let icon;
    if (city) icon = city.hourly[this.props.whichHour].icon;

    switch (icon) {
      case "fog": case "cloudy":
        return this.makeXClouds(6)
      case "partly-cloudy-day": case "partly-cloudy-night":
        return this.makeXClouds(4)
      case "clear-day": case "clear-night": case "wind":
        return <Cloud />
      case "snow": case "sleet":
        return this.makeXClouds(5)
      case "rain":
        return this.makeXClouds(6)
      default:
        return this.makeXClouds(3)
    }
  }

  getSunPosition = () => {
    if (this.props.city) {
      const { hourly } = this.props.city
      let hourlyTime = hourly[this.props.whichHour].time
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

  getLandmark = () => {
    if (this.props.city) {
      switch (this.props.city.full_city_name) {
        case "Paris":
          return <a-entity collada-model="url(/models/eiffeltower.dae)" scale=".1 .1 .1" position="-2 6 -18" rotation="0 45 0"></a-entity>
        case "New York City":
          return <a-entity collada-model="url(/models/empirestate.dae)" scale="3 3 3" position="-2 9.2 -18" rotation="0 45 0"></a-entity>
        case "Denver":
          return <a-entity collada-model="url(/models/mountain.dae)" scale=".25 .25 .25" position="-10 5.5 -40" rotation="0 145 0"></a-entity>
        case "London":
          return <a-entity collada-model="url(/models/BigBen/model.dae)" scale=".25 .25 .25" position="-15 0 -30" rotation="0 -90 0"></a-entity>
        case "Dubai":
          return <a-entity collada-model="url(/models/Burj/model.dae)" scale=".08 .08 .08" position="-15 0 -30" rotation="0 -45 0"></a-entity>
        case "Seattle":
          return <a-entity collada-model="url(/models/spaceneedle.dae)" scale=".7 .7 .7" position="40 0 -40" rotation="0 135 0"></a-entity>
        case "Honolulu":
          return <a-entity collada-model="url(/models/coconut.dae)" scale="50 50 50" position="-30 0 -55" rotation="0 145 0"></a-entity>
        case "Sao Paulo":
          return <a-entity collada-model="url(/models/SaoPaulo/model.dae)" scale=".5 .5 .5" position="-30 0 -55" rotation="0 60 0"></a-entity>
        case "Istanbul":
          return <a-entity collada-model="url(/models/Istanbul/model.dae)" scale=".5 .5 .5" position="-30 0 -55" rotation="0 60 0"></a-entity>
        case "Jakarta":
          return <a-entity collada-model="url(/models/jakarta.dae)" scale=".5 .5 .5" position="-30 0 -55" rotation="0 60 0"></a-entity>
        case "Cairo":
          return <a-entity collada-model="url(/models/sphinx/model.dae)" scale="10 10 10" position="-30 0 -55" rotation="0 30 0"></a-entity>
        default:
          return null
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

  toMars = () => {
    this.props.history.replace('/mars')
  }

  showCityDetails = () => {
    const { city } = this.props

    if (city){
      const { hourly } = city
      const { temperature, summary } = hourly[this.props.whichHour]
      return (
        <Entity
          primitive='a-plane'
          color='#E2A596'
          width='1'
          height='1'
          position="-10 1 -8"
          text={{value: `In ${city.full_city_name}: \n ${temperature} F  \n ${summary}`, align: 'center', wrapCount: 14, side: 'double'}}
          opacity='.6'>
        </Entity>
      )
    }
  }

  render(){
    return(
      <a-scene rain={this.props.city ? this.isItSnowing() : "count: 0;"}>

        <Entity environment={{lightPosition: this.getSunPosition(),
          preset: 'starry',
          skyType: 'atmosphere',
          seed: 1,
          fog: 0.2,
          shadow: true,
          ground: 'flat',
          groundYScale: 6.31,
          groundColor: this.getGroundColor1(),
          groundColor2: this.getGroundColor2(),
          groundTexture: 'squares',
          grid: 'none'}}>
        </Entity>

        <Entity primitive="a-light" type="ambient" color="white" intensity=".5"/>

        {(this.props.city) && this.howCloudy()}
        {this.showCityDetails()}
        {this.getLandmark()}
        {(this.props.locations) && this.makeLocationButtons() }

        <Entity events={{click: this.goBack}}
          primitive='a-plane'
          color='black'
          width='1'
          height='1'
          position="-13 1 -8"
          text={{value: 'Exit VR', align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>

        <Entity events={{click: this.props.decrementHour}}
          primitive='a-plane'
          color='#AAB89B'
          width='1'
          height='1'
          position="-12 1 -8"
          text={{value: 'Previous Hour', align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>

        <Entity events={{click: this.props.incrementHour}}
          primitive='a-plane'
          color='#99C6D8'
          width='1'
          height='1'
          position="-11 1 -8"
          text={{value: 'Next Hour', align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>

        <Entity
          primitive='a-plane'
          color='#ECDCB9'
          width='1'
          height='1'
          position="-9 1 -8"
          text={{value: 'Teleport to:', align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>

        <Entity events={{click: this.toMars}}
          primitive='a-plane'
          color='#E9DCD1'
          width='1'
          height='1'
          position="13 1 -8"
          text={{value: 'Mars', align: 'center', wrapCount: 12, side: 'double'}}
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
    whichHour: state.whichHour.length,
    locations: state.locations
  }
}

export default compose(withRouter, connect(mapStateToProps, { incrementHour, decrementHour }))(Sun)
