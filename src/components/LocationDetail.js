import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { deleteDetail } from '../actions/actions.js'
import { withRouter } from 'react-router-dom'
import SmallDetails from './SmallDetails'
import '../styles/LocationDetail.css'
import { Icon } from 'antd'


class LocationDetail extends React.Component {

  sendDelete = () => {
    this.props.deleteDetail(this.props.selection)
  }

  forecastThisWeek = () => {
    return this.props.selection.daily.slice(0,7).map(day => {
      return <SmallDetails day={day} />
    })
  }

  render(){

    let { full_city_name, humidity, cloudCover, dewPoint, precipProbability, uvIndex, date, time, temp, windSpeed, dailySummary, latitude, longitude, high, low } = this.props.selection

    return (
      <div id="location-detail">
        <div className='close-icon-detail' onClick={this.sendDelete}><Icon type="close-square-o" /></div>
        <div className='detail-text'>
          <h1 style={{lineHeight: '20px'}}>{full_city_name.toUpperCase()}</h1>
          <h4>{date}, {time}</h4>
          <h4>{dailySummary}</h4>
          <div className='current-conditions'>
            <div className='this-week'>
              {this.forecastThisWeek()}
            </div>

              <div className='quick-weathers'>
                <div className='little-icons'>
                  <h3>{temp}&#176;F </h3>
                  <h4>{high} / {low}</h4>
                </div>
                <div className='little-icons' >
                  <h3>{(humidity * 100).toFixed(2)}% </h3>
                  <h4>Humidity</h4>
                </div>
                <div className='little-icons' >
                  <h3>{(precipProbability * 100).toFixed(2)}% </h3>
                  <h4>Precipitation</h4>
                </div>
                <div className='little-icons' >
                  <h3>{dewPoint.toFixed(2)}&#176; </h3>
                  <h4>Dew Point</h4>
                </div>
                <div className='little-icons' >
                  <h3>{windSpeed.toFixed(2)} MPH</h3>
                  <h4>Wind Speed</h4>
                </div>
                <div className='little-icons' >
                  <h3>{uvIndex.toFixed(2)} </h3>
                  <h4>UV Index</h4>
                </div>
                <div className='little-icons' >
                  <h3>{(cloudCover * 100).toFixed(2)}% </h3>
                  <h4>Cloud Cover</h4>
                </div>
              </div>
          </div>
        </div>
        <iframe className='cool-map' seamless title="cool-map" src={`https://maps.darksky.net/@temperature,${latitude},${longitude},5.js?embed=true&timeControl=false&fieldControl=true&defaultField=temperature&defaultUnits=_f`}>
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

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(LocationDetail)
