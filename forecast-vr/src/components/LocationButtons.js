import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd'
import ButtonCard from './ButtonCard'
import { newFetchLocation } from '../actions/actions.js'
import { bindActionCreators } from 'redux';


const LocationButtons = (props) => {

  const makeButtons = () => {
    return props.locations.map(loc => <ButtonCard addNewLocation={addNewLocation} location={ loc } key={loc.full_city_name} />)
  }

  const addNewLocation = (location) => {
    props.newFetchLocation(location)
  }

    return(
      <div>
        {(props.locations) ? makeButtons() : null }
      </div>
    )
}

const mapStateToProps = state => {
  return {locations: state.defaultLocations}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    newFetchLocation: newFetchLocation
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationButtons)
