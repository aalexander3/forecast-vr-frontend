import React from 'react'
import '../styles/SmallDetails.css'

const SmallDetails = props => {
  let {time, temperatureHigh, temperatureLow, icon} = props.day
  console.log(props.day);

  const whatsTheDay = () => {
    let date = new Date(props.day.time * 1000)
    return date.toDateString().slice(0,3)
  }

  return (
    <div className='small-detail-card'>
      <p> {icon} </p>
      <p> {whatsTheDay()} </p>
      <p> {temperatureHigh} / {temperatureLow} </p>
    </div>
  )
}

export default SmallDetails
