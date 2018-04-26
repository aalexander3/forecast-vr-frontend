import React from 'react'
import { deleteLocation, selectLocation } from '../actions/actions.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'antd'
import '../styles/LocationCard.css'

const LocationCard = (props) => {
  console.log(props);
  let {full_city_name, conditions, obs_time, temp, wind} = props.location

  const sendDelete = () => {
    props.deleteLocation(props.location)
  }

  const selectLocation = () =>{
    props.selectLocation(props.location)
  }

  return(
    <div className='location-card'>
        <div className='close-icon' onClick={sendDelete}><Icon type="close-square-o" /></div>
        <h3 className='card-city-name' onClick={selectLocation}>{full_city_name}</h3>
        <iframe title={full_city_name} className='iframe-cards' src='https://media2.giphy.com/media/3og0IOUWB5AZoP6la0/giphy.gif'/>
        <br/>
        <h4>{conditions} </h4>
        <h4>{obs_time} </h4>
        <h4>{temp} F </h4>
    </div>)
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteLocation: deleteLocation,
    selectLocation: selectLocation
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LocationCard)
