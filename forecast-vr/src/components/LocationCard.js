import React from 'react'
import { deleteLocation, selectLocation, fixOffset } from '../actions/actions.js'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Icon } from 'antd'
import '../styles/LocationCard.css'

const LocationCard = (props) => {

  let {full_city_name, conditions, time, date, temp, citySlug, low, high, hourly, offset} = props.location
  let {time: hourlyTime, summary, temperature} = hourly[props.whichHour]

  let timeToUse = fixOffset(hourlyTime, offset).toTimeString()
  let dateToUse = fixOffset(hourlyTime, offset).toDateString().slice(0, -5)

  const sendDelete = () => {
    props.deleteLocation(props.location)
  }

  const selectLocation = () =>{
    props.selectLocation(props.location)
  }

  const renderIFrame = () => {
    return <iframe seamless title={full_city_name} className='iframe-cards' src={"http://localhost:3000/" + citySlug}/>
  }

  return (
    <div className='location-card'>
      <div className='close-icon' onClick={sendDelete}><Icon type="close-square-o" /></div>
      <div className='city-title'><h3 className='card-city-name' onClick={selectLocation}>{full_city_name.toUpperCase()}</h3></div>
      <h4 className='conditions'> {parseInt(temperature)}&#176; F and {summary} </h4>

      {renderIFrame()}
      <br/>

      <h4 className='time-card'> {timeToUse.slice(0,3) + time.slice(-2)} </h4>
      <h4 className='date-card'> {dateToUse} </h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationCard)
