import React from 'react'
import { connect } from 'react-redux';
import LocationCard from './LocationCard'
import LocationDetail from './LocationDetail'
import '../styles/LocationPage.css'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const LocationPage = props => {

  const makeLocationCards = () => {
    return props.locations.map(city => <LocationCard key={city.full_city_name} city={city} />)
  }

  const makeLocationDetail = () => {
    return (props.selectedLocation) ? <div className='location-detail'><LocationDetail /></div> : null
  }

  const detailVsCards = () => {
    if (props.selectedLocation){
      return makeLocationDetail()
    } else {
        return makeLocationCards()
    }
  }

  return (
    <div id="location-page" style={(props.locations.length === 0) ? {overflowY: 'hidden'} : {overflowY: 'scroll'}}>
      {(props.locations.length === 0) ? <img className='sunny-spinny' src='/images/sun-image.png' alt='Spinning sun placeholder' /> : null }
      {detailVsCards()}
    </div>
  )
}

const mapStateToProps = state => {
  return {locations: state.whichCities, selectedLocation: state.selectedLocation}
}

export default connect(mapStateToProps)(LocationPage)
