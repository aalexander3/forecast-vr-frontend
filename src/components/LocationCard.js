import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom'
import { Icon, Button } from 'antd'

import { deleteLocation, selectLocation, fixOffset } from '../actions/actions.js'
import '../styles/LocationCard.css'
import { image_object } from '../constants/image_object'


const LocationCard = (props) => {
  console.log(props);

  let {full_city_name, conditions, time, date, temp, citySlug, low, high, hourly, offset} = props.city
  let {time: hourlyTime, summary, temperature, icon: hourlyIcon} = hourly[props.whichHour]

  let timeToUse = fixOffset(hourlyTime, offset).toTimeString()
  let dateToUse = fixOffset(hourlyTime, offset).toDateString().slice(0, -5)

  const handleClick = () => {
    props.history.replace(`/${citySlug}`)
  }

  const sendDelete = () => {
    props.deleteLocation(props.city)
  }

  const selectLocation = () => {
    props.selectLocation(props.city)
  }

  const switchImageSource = () => {
    let okayTimes = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
    let currentTime;

    if (okayTimes.includes(timeToUse.slice(0,2))) {
      currentTime = timeToUse.slice(0,2)
    } else {
      currentTime = "21"
    }

    switch (hourlyIcon) {
      case "fog": case "cloudy": case "partly-cloudy-day": case "partly-cloudy-night":
        return image_object['cloudy'][currentTime]
      case "clear-day": case "clear-night": case "wind":
        return image_object['clear'][currentTime]
      case "snow": case "sleet":
        return image_object['snowy'][currentTime]
      case "rain":
        return image_object['rainy'][currentTime]
      default:
        return image_object['clear']['21']
    }
  }

  const renderIFrame = () => {
    return <img className='iframe-cards' alt={full_city_name} src={switchImageSource()} />
    // return <iframe seamless title={full_city_name} className='iframe-cards' src={"http://localhost:3000/" + citySlug}/>
  }

  return (
    <div className='location-card'>
      <div className='close-icon' onClick={sendDelete}><Icon type="close-square-o" /></div>
      <div className='city-title' onClick={selectLocation}><h3 className='card-city-name' >{full_city_name.toUpperCase()}</h3></div>
      <h4 className='conditions'> {parseInt(temperature)}&#176;F - {summary} </h4>
      {renderIFrame()}
      <br/>
      <h4 className='time-card'> {timeToUse.slice(0,3) + time.slice(-2)} </h4>
      <h4 className='date-card'> {dateToUse} </h4>
      <Button className='buttons' type="secondary" onClick={handleClick}>ENTER VR</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {whichHour: state.whichHour.length}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteLocation: deleteLocation,
    selectLocation: selectLocation
  }, dispatch)
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(LocationCard)
