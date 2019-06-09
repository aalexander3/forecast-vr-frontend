import React from 'react'
import { connect } from 'react-redux';
import ButtonCard from './ButtonCard'
import { selectLocation, addCityToWhich, deleteDetail } from '../actions/actions.js'
import { bindActionCreators } from 'redux';
import Media from 'react-media'
import { Select } from 'antd';

const { Option } = Select;

const LocationButtons = (props) => {

  const makeButtons = () => {
    return props.locations.map(loc => <ButtonCard addNewLocation={addNewLocation} location={ loc } key={loc.full_city_name} />)
  }

  const makeSelect = () => {
    const options = props.locations.map(loc => <Option value={loc.full_city_name} key={loc.full_city_name} >{loc.full_city_name}</Option>)
    return (
      <Select onChange={handleChange} placeholder="Select a location" style={{ width: 200 }}>
        {options}
      </Select>
    )
  }

  const handleChange = (value) => {
    const location = props.locations.find(loc => loc.full_city_name === value)
    addNewLocation(location)
  }


  const addNewLocation = (location) => {
    props.deleteDetail(location)
    props.addCityToWhich(location)
  }

  return (
    <div>
      {props.locations && <Media query="(max-width: 1299px)">
        {matches => matches ? (makeSelect()) : (makeButtons())}
      </Media>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {locations: state.locations}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    selectLocation: selectLocation,
    addCityToWhich: addCityToWhich,
    deleteDetail: deleteDetail
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationButtons)
