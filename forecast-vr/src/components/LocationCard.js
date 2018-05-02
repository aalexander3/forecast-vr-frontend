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
      <h3 className='card-city-name' onClick={selectLocation}>{full_city_name}</h3>
      {/* {renderIFrame()} */}
      <br/>
      <h4>{conditions} </h4>
      <h4>{date}, {time} </h4>
      <div className='all-temps'>

        <h2>{low}&#176; <br/> <p>low</p></h2>
        <div className='temperatures'>
          <h2>{temp}&#176;</h2>
        </div>
        <br/>
        <h2>{high}&#176; <br/><p>high</p></h2>
      </div>
    </div>)
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteLocation: deleteLocation,
    selectLocation: selectLocation
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LocationCard)
