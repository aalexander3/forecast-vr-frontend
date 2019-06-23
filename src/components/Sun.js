// react imports
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { fixOffset } from '../actions/actionHelper'
import { incrementHour, decrementHour } from '../actions/hourActions'
import Cloud from './Cloud'
import CitySceneHOC from './CitySceneHOC'
import { sunPosition, iconConstant, cityModels } from '../constants'
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

class Sun extends Component {

  state = {
    city: null
  }

  componentDidMount(){
    this.findLocation(this.props.match.params.location)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.location !== this.props.match.params.location || (prevProps.locations.length === 0 && this.props.locations.length > 0)) {
      this.findLocation(this.props.match.params.location)
    }
  }

  findLocation = (cityName) => {
    let city = this.props.locations.find(city => city.citySlug === cityName)
    this.setState({city})
  }

  getGroundColor1 = () => {
    const { city } = this.state

    if (city) {
      let icon = city.hourly[this.props.whichHour].icon;
      if (iconConstant[icon]) return iconConstant[icon].primaryColor
      return iconConstant['default'].primaryColor
    }
  }

  getGroundColor2 = () => {
    const { city } = this.state
    if (city) {
      let icon = city.hourly[this.props.whichHour].icon;
      if (iconConstant[icon]) return iconConstant[icon].secondaryColor
      return iconConstant['default'].secondaryColor
    }
  }

  isItSnowing = () => {
    const { city } = this.state
    if (city) {
      let icon = city.hourly[this.props.whichHour].icon;
      if (iconConstant[icon]) return iconConstant[icon].rainCount
      return iconConstant['default'].rainCount
    }
  }

  makeXClouds = number => {
    return new Array(number).fill(<Cloud />)
  }

  howCloudy = () => {
    const { city } = this.state
    if (city) {
      let icon = city.hourly[this.props.whichHour].icon;
      if (iconConstant[icon]) {
        return this.makeXClouds(iconConstant[icon].numClouds)
      } else {
        return this.makeXClouds(iconConstant['default'].numClouds)
      }
    }
  }

  getSunPosition = () => {
    const { city } = this.state
    if (this.state.city) {
      const { hourly, offset } = city
      let hourlyTime = hourly[this.props.whichHour].time
      let timeToUse = fixOffset(hourlyTime, offset).toTimeString().slice(0,2)
      if (sunPosition[timeToUse]) return sunPosition[timeToUse]
      return sunPosition['default']
    }
  }

  getLandmark = () => {
    const { city } = this.state
    if (city) return cityModels[city.full_city_name]
  }

  toMars = () => {
    this.props.history.replace('/mars')
  }

  showCityDetails = () => {
    const { city } = this.state

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
      <a-scene rain={this.state.city ? this.isItSnowing() : "count: 0;"}>
        <Entity environment={{
          lightPosition: this.getSunPosition(),
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
          grid: 'none'
        }}>
        </Entity>
        <Entity primitive="a-light" type="ambient" color="white" intensity=".5"/>

        {(this.state.city) && this.howCloudy()}
        {this.showCityDetails()}
        {this.getLandmark()}
        {(this.props.locations) && this.props.makeLocationButtons() }

        <Entity
          events={{click: this.props.goBack}}
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
    whichHour: state.whichHour,
    locations: state.locations
  }
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    { incrementHour, decrementHour }
  ),
  CitySceneHOC
)

export default enhance(Sun)
