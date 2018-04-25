import React from 'react'
import '../styles/LocationCard.css'


const LocationCard = (props) => {
  console.log(props);
  let {full_city_name, conditions, local_time, temp, wind} = props.location
  return(
    <div className='location-card'>
        <h3>{full_city_name}</h3>
        <iframe className='iframe-cards' src='https://media2.giphy.com/media/3og0IOUWB5AZoP6la0/giphy.gif'/>
        <br/>
        <h4>{conditions} </h4>
        <h4>{local_time} </h4>
        <h4>{temp} F </h4>
    </div>)
}

export default LocationCard
