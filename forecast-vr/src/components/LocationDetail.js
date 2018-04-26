import React from 'react'
import { connect } from 'react-redux';
import '../styles/LocationDetail.css'


const LocationDetail = props => {
  console.log(props);
  let {full_city_name, conditions, obs_time, temp, windSpeed, dailySummary, sunriseTime, sunsetTime} = props.location

  return(
    <div id="location-detail">
      <h1>{full_city_name}</h1>
      <p>{dailySummary}</p>
      <h3>Wind is blowing at {windSpeed} mph</h3>
      <h3>Sunrise: {sunriseTime}</h3>
      <h3>Sunset {sunsetTime}</h3>
    </div>
  )
}

const mapStateToProps = state => {
  return {location: state.selectedLocation}
}

export default connect(mapStateToProps)(LocationDetail)
