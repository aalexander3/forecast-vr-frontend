import React from 'react'
import { connect } from 'react-redux';
import '../styles/LocationDetail.css'


const LocationDetail = props => {
  console.log(props);
  return(
    <div id="location-detail">
      Hey from location detail
    </div>
  )
}

const mapStateToProps = state => {
  return {location: state.selectedLocation}
}

export default connect(mapStateToProps)(LocationDetail)
