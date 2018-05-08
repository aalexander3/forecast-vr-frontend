import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { deleteDetail } from '../actions/actions.js'
import { withRouter } from 'react-router-dom'
import SmallDetails from './SmallDetails'
import '../styles/LocationDetail.css'
import { Icon, Button, Tabs  } from 'antd'

const TabPane = Tabs.TabPane


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

    let {full_city_name, conditions, date, time, temp, windSpeed, dailySummary, sunriseTime, sunsetTime, latitude, longitude, citySlug, high, low} = this.props.selection

    return (
      <div id="location-detail">
        <div className='close-icon-detail' onClick={this.sendDelete}><Icon type="close-square-o" /></div>
        <div className='detail-text'>
          <h1>{full_city_name}</h1>
          <p>{dailySummary}</p>
          <div className='current-conditions'>
            <h2>Current Conditions</h2>
            <p>{date}, {time}</p>
            <div className='this-week'>
              {this.forecastThisWeek()}
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Today" key="1">
                <div className="thermometer"></div>
                <div className='temperatures'>
                  <h2>{temp}&#176;F </h2>
                  <h4>{high} / {low}</h4>
                </div>
              </TabPane>
              <TabPane tab="This Week" key="2">Tab 2</TabPane>
              <TabPane tab="Sun" key="3">
                <h3>Wind is blowing at {windSpeed} mph</h3>
                <h3>Sunrise: {sunriseTime}</h3>
                <h3>Sunset: {sunsetTime}</h3>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <iframe className='cool-map' seamless title="cool-map" src={`https://maps.darksky.net/@temperature,${latitude},${longitude},5`}>
        {/* <iframe className='cool-map' seamless title="cool-map" src={`https://www.ventusky.com/?p=${latitude};${longitude};4&l=temperature-2m`}> */}
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
