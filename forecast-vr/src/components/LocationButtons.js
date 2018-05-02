import React from 'react'
import { connect } from 'react-redux';
import ButtonCard from './ButtonCard'
import { selectLocation, addCityToWhich } from '../actions/actions.js'
import { bindActionCreators } from 'redux';

const LocationButtons = (props) => {

  const makeButtons = () => {
    return props.locations.map(loc => <ButtonCard addNewLocation={addNewLocation} location={ loc } key={loc.full_city_name} />)
  }

  const addNewLocation = (location) => {
    debugger
    props.addCityToWhich(location)
  }

    return (
      <div>
        {(props.locations) ? makeButtons() : null }
      </div>
    )
}

const mapStateToProps = state => {
  return {locations: state.locations}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    selectLocation: selectLocation,
    addCityToWhich: addCityToWhich
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationButtons)
