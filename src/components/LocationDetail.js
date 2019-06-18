import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { deleteDetail } from '../actions/locationActions'
import { fixOffset } from '../actions/actionHelper'
import { withRouter } from 'react-router-dom'
import SmallDetails from './SmallDetails'
import LittleIcon from './LittleIcon'
import { Icon, Button } from 'antd'

class LocationDetail extends Component {

  handleClick = (e) => {
    const { citySlug } = this.props.selection
    this.props.history.replace(`/${citySlug}`)
  }

  sendDelete = () => {
    this.props.deleteDetail(this.props.selection)
  }

  forecastThisWeek = () => {
    return this.props.selection.daily.slice(0,7).map(day => {
      return <SmallDetails day={day} key={day} />
    })
  }

  render(){

    let { full_city_name, humidity, time, cloudCover, dewPoint, precipProbability, uvIndex, windSpeed, latitude, longitude, high, low, hourly, offset, dailySummary } = this.props.selection

    let {time: hourlyTime, temperature } = hourly[this.props.whichHour]

    let timeToUse = fixOffset(hourlyTime, offset).toTimeString()
    let dateToUse = fixOffset(hourlyTime, offset).toDateString().slice(0, -5)

    return (
      <div id="location-detail">
        <div className='close-icon-detail' onClick={this.sendDelete}><Icon type="close-square-o" /></div>
        <div className='detail-text'>
          <h1 style={{lineHeight: '20px'}}>{full_city_name.toUpperCase()}</h1>
          <h4>{dateToUse}, {timeToUse.slice(0,3) + time.slice(-2)}</h4>
          <h4>{dailySummary}</h4>
          <Button className='buttons' type="secondary" onClick={this.handleClick}>ENTER VR</Button>
          <div className='current-conditions'>
            <div className='this-week'>
              {this.forecastThisWeek()}
            </div>

            <div className='quick-weathers'>
              <LittleIcon data={`${temperature} °F`} text={`${high} / ${low}`}/>
              <LittleIcon data={`${(humidity * 100).toFixed(2)}%`} text={`Humidity`} />
              <LittleIcon data={`${(precipProbability * 100).toFixed(2)}%`} text={`Precipitation`} />
              <LittleIcon data={`${dewPoint.toFixed(2)}°`} text={`Dew Point`} />
              <LittleIcon data={`${windSpeed.toFixed(2)} MPH`} text={`Wind Speed`} />
              <LittleIcon data={`${uvIndex.toFixed(2)}`} text={`UV Index`} />
              <LittleIcon data={`${(cloudCover * 100).toFixed(2)}%`} text={`Cloud Cover`} />
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
  return {
    selection: state.selectedLocation,
    whichHour: state.whichHour.length
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteDetail: deleteDetail
  }, dispatch)
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(LocationDetail)
