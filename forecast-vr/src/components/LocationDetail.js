import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button } from 'antd'
import { deleteDetail } from '../actions/actions.js'
import '../styles/LocationDetail.css'
import { withRouter } from 'react-router-dom'

class LocationDetail extends React.Component {

  sendDelete = () => {
    this.props.deleteDetail(this.props.location)
  }

  render(){
    console.log(this.props);

    let {full_city_name, conditions, date, time, temp, windSpeed, dailySummary, sunriseTime, sunsetTime, latitude, longitude, citySlug} = this.props.selection

    return (
      <div id="location-detail">
        <div className='close-icon-detail' onClick={this.sendDelete}><Icon type="close-square-o" /></div>
        <Button type="primary" onClick={() => { this.props.history.push(`/${citySlug}`) }}>ENTER FULLSCREEN VR</Button>
        <h1>{full_city_name}</h1>
        <p>{dailySummary}</p>
        <h2>Current Conditions</h2>
        <p>{date}, {time}</p>
        <p>{temp} F</p>
        <h3>Wind is blowing at {windSpeed} mph</h3>
        <h3>Sunrise: {sunriseTime}</h3>
        <h3>Sunset: {sunsetTime}</h3>
        <iframe seamless title="cool-map"
          src={`https://maps.darksky.net/@emoji,${latitude},${longitude},5`}
          style={{width: '100%', height: '30rem', margin: '2%', border: 'none', 'borderRadius':'10px'}}>
        </iframe>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {selection: state.selectedLocation}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteDetail: deleteDetail
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LocationDetail))
