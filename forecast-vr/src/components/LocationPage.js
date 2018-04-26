import React from 'react'
import { connect } from 'react-redux';
import LocationCard from './LocationCard'
import LocationDetail from './LocationDetail'
import '../styles/LocationPage.css'

// import { fetchLocation } from  '../actions/actions';

const LocationPage = props => {
  console.log(props);

  const makeLocationCards = () => {
    return props.locations.map(loc => <LocationCard key={loc.full_city_name} location={loc} />)
  }

  const makeLocationDetail = () => {
    return (props.selectedLocation) ? <div className='location-detail'><LocationDetail /></div> : null
  }

  return (
    <div id="location-page">
      <div className='location-cards'>{makeLocationCards()}</div>
      {makeLocationDetail()}
    </div>
  )
}

const mapStateToProps = state => {
  return {locations: state.locations, selectedLocation: state.selectedLocation}
}

export default connect(mapStateToProps)(LocationPage)
