import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom'
import { Icon, Button } from 'antd'
import { deleteLocation, selectLocation } from '../actions/locationActions'
import { fixOffset } from '../actions/actionHelper'
import { image_object } from '../constants/image_object'

const LocationCard = (props) => {

  let {full_city_name, time, citySlug, hourly, offset} = props.city
  let {time: hourlyTime, summary, temperature, icon: hourlyIcon} = hourly[props.whichHour]

  let timeToUse = fixOffset(hourlyTime, offset).toTimeString()
  let dateToUse = fixOffset(hourlyTime, offset).toDateString().slice(0, -5)

  const handleClick = (e) => {
    props.history.replace(`/${citySlug}`)
  }

  const sendDelete = (e) => {
    e.stopPropagation()
    props.deleteLocation(props.city)
  }

  const selectLocation = (e) => {
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
  }

  return (
    <div className='location-card' onClick={selectLocation}>
      <div className='close-icon' onClick={sendDelete}><Icon type="close-square-o" /></div>
      <div className='city-title'><h3 className='card-city-name' >{full_city_name.toUpperCase()}</h3></div>
      <h4 className='conditions'> {parseInt(temperature, 10)}&#176;F - {summary} </h4>
      {renderIFrame()}
      <br/>
      <h4 className='time-card'> {timeToUse.slice(0,3) + time.slice(-2)} </h4>
      <h4 className='date-card'> {dateToUse} </h4>
      <Button className='buttons' type="secondary" onClick={handleClick}>ENTER VR</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return { whichHour: state.whichHour }
}

export default compose(withRouter, connect(mapStateToProps, { deleteLocation, selectLocation }))(LocationCard)
