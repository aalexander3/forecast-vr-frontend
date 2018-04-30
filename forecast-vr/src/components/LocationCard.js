import React from 'react'
import { deleteLocation, selectLocation } from '../actions/actions.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'antd'
import '../styles/LocationCard.css'

const LocationCard = (props) => {

  let {full_city_name, conditions, time, date, temp, citySlug} = props.location

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
    return <iframe onMouseOver={handleMouse} seamless title={full_city_name} className='iframe-cards' src={switchSource() }/>
    // return <iframe seamless title={full_city_name} className='iframe-cards' src={"http://localhost:3000/" + citySlug}/>
  }

  const switchSource = () => {
    switch (props.location.conditions) {
      case "Overcast": case "Partly Cloudy": case "Mostly Cloudy": case "Scattered Clouds": case "Cloudy":
        return 'https://images.pexels.com/photos/6566/sea-sky-clouds-weather.jpg?auto=compress&cs=tinysrgb&h=350'
      case "Clear": case "Sunny": case "Mostly Sunny": case "Partly Sunny":
        return "https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?auto=compress&cs=tinysrgb&h=350"
      case "Snow": case "Sleet":
        return 'https://images.pexels.com/photos/718857/pexels-photo-718857.jpeg?auto=compress&cs=tinysrgb&h=350'
      case "Rain": case "Freezing Rain": case "Flurries": case "Light Rain":
        return 'https://images.pexels.com/photos/17739/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
      case "Thunderstorm": case "Thunderstorms":
        return 'https://images.pexels.com/photos/355989/pexels-photo-355989.jpeg?auto=compress&cs=tinysrgb&h=350'
      case "Fog": case "Haze":
        return 'https://images.pexels.com/photos/584580/pexels-photo-584580.jpeg?auto=compress&cs=tinysrgb&h=350'
      default:
        return 'https://images.pexels.com/photos/584580/pexels-photo-584580.jpeg?auto=compress&cs=tinysrgb&h=350'
    }
  }

  return(
    <div className='location-card'>
      <div className='close-icon' onClick={sendDelete}><Icon type="close-square-o" /></div>
      <h3 className='card-city-name' onClick={selectLocation}>{full_city_name}</h3>
      {renderIFrame()}
      <br/>
      <h4>{conditions} </h4>
      <h4>{date}, {time} </h4>
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
