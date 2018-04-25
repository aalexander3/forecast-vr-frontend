import React from 'react'
import LocationCard from './LocationCard'
import '../styles/LocationPage.css'
import { connect } from 'react-redux';

// import { fetchLocation } from  '../actions/actions';

const LocationPage = props => {
  console.log(props);

  const makeLocationCards = () => {
    return props.locations.map(loc => <LocationCard key={loc.full_city_name} location={loc} />)
  }

  return (
    <div id="location-page">
        {makeLocationCards()}
    </div>
  )
}

const mapStateToProps = state => {
  return {locations: state.locations}
}

export default connect(mapStateToProps)(LocationPage)
