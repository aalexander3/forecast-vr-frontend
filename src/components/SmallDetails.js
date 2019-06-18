import React from 'react'

const SmallDetails = props => {
  let {temperatureHigh, temperatureLow, icon} = props.day

  const whatsTheDay = () => {
    let date = new Date(props.day.time * 1000)
    return date.toDateString().slice(0,3)
  }

  const getImageSrc = () => {
    switch (icon) {
      case "fog": case "cloudy":
        return 'https://image.flaticon.com/icons/svg/131/131043.svg'
      case "partly-cloudy-day": case "partly-cloudy-night":
        return 'https://image.flaticon.com/icons/svg/131/131046.svg'
      case "clear-day":
        return 'https://image.flaticon.com/icons/svg/131/131042.svg'
      case "clear-night":
        return 'https://image.flaticon.com/icons/svg/865/865779.svg'
      case "wind":
        return 'https://image.flaticon.com/icons/svg/824/824695.svg'
      case "snow": case "sleet":
        return 'https://image.flaticon.com/icons/svg/615/615812.svg'
      case "rain":
        return 'https://image.flaticon.com/icons/svg/131/131041.svg'
      default:
        return "https://image.flaticon.com/icons/svg/131/131079.svg"
    }
  }

  return (
    <div className='small-detail-card'>
      <img className="weather-icon" alt={icon} src={getImageSrc()} />
      <p> {whatsTheDay()} </p>
      <p> {temperatureHigh} / {temperatureLow} </p>
    </div>
  )
}

export default SmallDetails
