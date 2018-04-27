import React from 'react'
import { deleteLocation, selectLocation } from '../actions/actions.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'antd'
import '../styles/LocationCard.css'

const LocationCard = (props) => {
  console.log(props);
  let {full_city_name, conditions, obs_time, temp, wind, citySlug} = props.location

  const sendDelete = () => {
    props.deleteLocation(props.location)
  }

  const selectLocation = () =>{
    props.selectLocation(props.location)
  }

  const renderIFrame = () => {
    return <iframe seamless title={full_city_name} className='iframe-cards' src={'http://localhost:3000/' + citySlug} />
  }

  const getSource = () => ("/" + citySlug)

  // const switchSource = () => {
  //   switch (props.location.conditions) {
  //     case "Overcast": case "Partly Cloudy": case "Mostly Cloudy": case "Scattered Clouds": case "Cloudy":
  //       return 'https://media2.giphy.com/media/26BGDQxDCZDFHW5Ne/giphy.gif'
  //     case "Clear": case "Sunny": case "Mostly Sunny": case "Partly Sunny":
  //       return "https://media1.giphy.com/media/26u6dryuZH98z5KuY/giphy.gif"
  //     case "Snow": case "Sleet":
  //       return 'http://localhost:3000/snow'
  //     case "Rain": case "Freezing Rain": case "Flurries": case "Light Rain":
  //       return 'http://localhost:3000/rain'
  //     case "Thunderstorm": case "Thunderstorms":
  //       return 'https://media2.giphy.com/media/ESfdA1EX02VW/giphy.gif'
  //     case "Fog": case "Haze":
  //       return 'https://media2.giphy.com/media/26BGDQxDCZDFHW5Ne/giphy.gif'
  //     default:
  //       return 'https://media1.giphy.com/media/26BREnyYXsPOxlUKk/giphy.gif'
  //   }
  // }

  return(
    <div className='location-card'>
        <div className='close-icon' onClick={sendDelete}><Icon type="close-square-o" /></div>
        <h3 className='card-city-name' onClick={selectLocation}>{full_city_name}</h3>
        {renderIFrame()}
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
