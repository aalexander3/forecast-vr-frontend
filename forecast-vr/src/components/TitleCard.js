import React from 'react'
import '../styles/TitleCard.css'
import { connect } from 'react-redux';
import { emojify } from 'react-emojione';
import { Divider} from 'antd'

const TitleCard = props => {
  let [default_location] = props.locations

  const getTheTime = () => {
    let currentTime = Date.now()
    let useThisTime = new Date(currentTime).toTimeString().slice(0,5)
    return useThisTime
  }


  const showCityDetails = () => {
    if (default_location){
      return (
        <div>
          <h3>{default_location.full_city_name}</h3>
          <h3>{default_location.date}, {getTheTime()} </h3>
        </div>
      )
    }
  }

  return(
    <div id="title-card">
      <h1 className='title-title'>F{emojify(':sunny:')}RECAST {emojify(':cloud_tornado:')}R</h1>

      <h3>Tomorrow's view on today's weather</h3>
      <br/><br/>
      {showCityDetails()}
    </div>
  )
}

const mapStateToProps = state => {
  return {locations: state.locations}
}

export default connect(mapStateToProps)(TitleCard)
