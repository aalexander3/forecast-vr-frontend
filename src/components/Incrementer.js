import React from 'react'
import { connect } from 'react-redux';
import { Slider, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { incrementHour, decrementHour } from  '../actions/actions';
import '../styles/Incrementer.css'


const Incrementer = (props) => {

  const handleDecrease = () => {
    props.decrementHour()
  }

  const handleIncrease = () => {
    props.incrementHour()
  }

  return (
    <div className='incrementer'>
      <h1>Forecast the next 48 hours </h1>

      {(props.hour === 0) ? <h3>Showing current conditions</h3> : (props.hour === 1) ? <h3>Forecasting {props.hour} hour from now</h3> : <h3>Forecasting {props.hour} hours from now</h3>}
      <div className="slider">
        <Icon type="minus-circle" onClick={handleDecrease} />
        <Slider min={0} max={48} value={props.hour} style={{color: '#CC979E'}} />
        <Icon type="plus-circle" onClick={handleIncrease} />
     </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {hour: state.whichHour.length}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    incrementHour: incrementHour,
    decrementHour: decrementHour
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Incrementer)
