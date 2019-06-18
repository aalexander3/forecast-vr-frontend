import React from 'react'
import { connect } from 'react-redux';
import { Slider, Icon } from 'antd';
import { incrementHour, decrementHour, changeHour } from  '../actions/hourActions';

const Incrementer = ({ decrementHour, incrementHour, changeHour, hour }) => {

  const handleDecrease = (e) => {
    decrementHour()
  }

  const handleIncrease = (e) => {
    incrementHour()
  }

  const handleChange = (e) => {
    changeHour(e)
  }

  return (
    <div className='incrementer'>
      <h1>Forecast the next 48 hours </h1>

      {(hour === 0) ? <h3>Showing current conditions</h3> : (hour === 1) ? <h3>Forecasting {hour} hour from now</h3> : <h3>Forecasting {hour} hours from now</h3>}
      <div className="slider">
        <Icon type="minus-circle" onClick={handleDecrease} />
        <Slider min={0} max={48} value={hour} style={{color: '#CC979E'}} onChange={handleChange} />
        <Icon type="plus-circle" onClick={handleIncrease} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { hour: state.whichHour }
}

export default connect(mapStateToProps, { incrementHour, decrementHour, changeHour })(Incrementer)
