import React from 'react'
import { connect } from 'react-redux';
import LocationCard from './LocationCard'
import LocationDetail from './LocationDetail'
import '../styles/LocationPage.css'


const LocationPage = props => {

  const makeLocationCards = () => {
    return props.locations.map(loc => <LocationCard key={loc.full_city_name} location={loc} />)
  }

  // const locationDiv = () => {
  //   return <div className='location-cards'>{makeLocationCards()}</div>
  // }

  const makeSelectedCard = () => {
    return <div id='selected-card'><LocationCard key={props.selectedLocation.full_city_name} location={props.selectedLocation}/></div>
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

      {detailVsCards()}
    </div>
  )
}

const mapStateToProps = state => {
  return {locations: state.locations, selectedLocation: state.selectedLocation}
}

export default connect(mapStateToProps)(LocationPage)
