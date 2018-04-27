import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'antd'
import { deleteDetail } from '../actions/actions.js'
import '../styles/LocationDetail.css'



const LocationDetail = props => {

  const {full_city_name, conditions, obs_time, temp, windSpeed, dailySummary, sunriseTime, sunsetTime, latitude, longitude} = props.location

  const sendDelete = () => {
    props.deleteDetail(props.location)
  }


  return (
    <div id="location-detail">
      <div className='close-icon-detail' onClick={sendDelete}><Icon type="close-square-o" /></div>
      <h1>{full_city_name}</h1>
      <p>{dailySummary}</p>
      <h3>Wind is blowing at {windSpeed} mph</h3>
      <h3>Sunrise: {sunriseTime}</h3>
      <h3>Sunset: {sunsetTime}</h3>
      <iframe seamless title="cool-map"
        src={`https://maps.darksky.net/@emoji,${latitude},${longitude},5`}
        style={{width: '100%', height: '30rem', margin: '2%', border: 'none', 'borderRadius':'10px'}}>
      </iframe>
    </div>
  )
}

const mapStateToProps = state => {
  return {location: state.selectedLocation}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteDetail: deleteDetail
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail)
