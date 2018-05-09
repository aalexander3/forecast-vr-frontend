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

  // const locationDiv = () => {
  //   return <div className='location-cards'>{makeLocationCards()}</div>
  // }

  const makeSelectedCard = () => {
    return <div id='selected-card'><LocationCard key={props.selectedLocation.full_city_name} city={props.selectedLocation}/></div>
  }

  const makeLocationDetail = () => {
    return (props.selectedLocation) ? <div className='location-detail'><LocationDetail /></div> : null
  }

  const detailVsCards = () => {
    if (props.selectedLocation){
      return [makeLocationDetail(), makeSelectedCard()]
    } else {
        return makeLocationCards()
    }
  }

  return (
    <div id="location-page">
      {(props.locations.length === 0) ? <img className='sunny-spinny' src='https://img.clipartxtras.com/2866cdc5bd6ecce5d9e50cce922444b1_free-sunshine-clipart-pictures-12-clipartix-free-sun-sunglasses-clipart_263-264.png' alt='Spinning sun placeholder' /> : null }
      {detailVsCards()}
    </div>
  )
}

const mapStateToProps = state => {
  return {locations: state.whichCities, selectedLocation: state.selectedLocation}
}

export default connect(mapStateToProps)(LocationPage)
