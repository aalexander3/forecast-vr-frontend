import React from 'react'
import { deleteLocation, selectLocation } from '../actions/actions.js'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Icon } from 'antd'
import '../styles/LocationCard.css'

const LocationCard = (props) => {

  let {full_city_name, conditions, time, date, temp, citySlug, low, high} = props.location

  const sendDelete = () => {
    props.deleteLocation(props.location)
  }

  const selectLocation = () =>{
    props.selectLocation(props.location)
  }

  const handleMouse = (e) => {
    e.target.src = 'http://localhost:3000/' + props.location.citySlug
  }

  const renderIFrame = () => {
    // return <iframe onMouseOver={handleMouse} seamless title={full_city_name} className='iframe-cards' src={switchSource() }/>
    return <iframe seamless title={full_city_name} className='iframe-cards' src={"http://localhost:3000/" + citySlug}/>
  }

  return(
    <div className='location-card'>
      <div className='close-icon' onClick={sendDelete}><Icon type="close-square-o" /></div>
      <div className='city-title'><h3 className='card-city-name' onClick={selectLocation}>{full_city_name.toUpperCase()}</h3></div>
      <h4 className='conditions'> {parseInt(temp)}&#176; and {conditions} </h4>

      {renderIFrame()}
      <br/>

      <h4 className='time-card'> {time} </h4>
      <h4 className='date-card'> {date} </h4>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteLocation: deleteLocation,
    selectLocation: selectLocation
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LocationCard)
