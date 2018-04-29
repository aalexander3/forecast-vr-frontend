import React from 'react'
import { connect } from 'react-redux';
import LocationCard from './LocationCard'
import LocationDetail from './LocationDetail'
import '../styles/LocationPage.css'
import { Route, Switch } from 'react-router-dom'
import Rain from './Rain'
import Snow from './Snow'


const LocationPage = props => {
  console.log(props);

  const makeLocationCards = () => {
    return props.locations.map(loc => <LocationCard key={loc.full_city_name} location={loc} />)
  }

  const locationDiv = () => {
    return <div className='location-cards'>{makeLocationCards()}</div>
  }

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

  // const mapRoutes = props.locations.map(loc => <Route exact path={`/${loc.citySlug}`} component={Rain} /> )

  return (
    <div id="location-page">
      <Route exact path='/rain' render={ () => <Rain /> } />
      {/* {mapRoutes} */}
      {detailVsCards()}
    </div>
  )
}

const mapStateToProps = state => {
  return {locations: state.locations, selectedLocation: state.selectedLocation}
}

export default connect(mapStateToProps)(LocationPage)
