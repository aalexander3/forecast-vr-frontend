export let addLocation = location => {
  return { type: 'ADD_LOCATION', location: location };
}

export let deleteLocation = location => {
  return { type: 'DELETE_CITY', location: location }
}

export let deleteDetail = location => {
  return { type: 'DELETE_DETAIL', location: location}
}

export let batchFetch = locations => {
  return {type: 'BATCH_LOCATIONS', locations: locations}
}

export let selectLocation = location => {
  return (dispatch) => {
    return fetch(process.env.REACT_APP_DARK_SKY_QUERY + location.latitude + ',' + location.longitude + "?exclude=flags,minutely")
      .then(res => res.json()).then(json => {
        dispatch({
          type: 'SELECT_LOCATION',
          location: getVars(json, location)
        })
      })
  }
}

export let incrementHour = () => {
  return {type: 'INCREMENT'}
}

export let decrementHour = () => {
  return {type: 'DECREMENT'}
}

export let addCityToWhich = location => {
  return { type: 'ADD_CITY', location: location}
}

export const fixOffset = (time, offset) => {
  let offsetBy = offset + 4
  let useThisTime = time * 1000 + (offsetBy * 3600000)
  return new Date(parseInt(useThisTime))
}

export const getVars = (json, location) => {
  let {time, temperature, summary: shortSummary, icon, windSpeed, cloudCover, humidity, dewPoint, precipProbability, uvIndex} = json.currently
  let {summary: dailySummary, data} = json.daily
  let {sunriseTime, sunsetTime, temperatureLow, temperatureHigh} = json.daily.data[0]

  let newSunset = fixOffset(sunsetTime, json.offset)
  let newSunrise = fixOffset(sunriseTime, json.offset)

  let sunrise = newSunrise.toTimeString().slice(0,5)
  let sunset = newSunset.toTimeString().slice(0,5)
  let useThisTime = fixOffset(time, json.offset)

  let stringTime = useThisTime.toTimeString().slice(0,5)
  let date = useThisTime.toDateString().slice(0, -5)

  let citySlug = location.full_city_name.toLowerCase().replace(/, | /gi, "-")
  let hourly = json.hourly.data


  return {
    full_city_name: location.full_city_name,
    latitude: location.latitude,
    longitude: location.longitude,
    date: date,
    time: stringTime,
    temp: temperature,
    high: temperatureHigh,
    low: temperatureLow,
    conditions: shortSummary,
    dailySummary: dailySummary,
    sunriseTime: sunrise,
    sunsetTime: sunset,
    citySlug: citySlug,
    hourly: hourly,
    icon: icon,
    offset: json.offset,
    daily: data,
    humidity: humidity,
    windSpeed: windSpeed,
    cloudCover: cloudCover,
    dewPoint: dewPoint,
    precipProbability: precipProbability,
    uvIndex: uvIndex
  }
}

export let newFetchLocation = location => {
    return fetch(process.env.REACT_APP_DARK_SKY_QUERY + location.latitude + ',' + location.longitude + "?exclude=flags,minutely")
      .then(res => res.json()).then(json => {
        return {location: getVars(json, location)}
  })
}

// const stringifyDate = (date, time) => {
//   const newTime = time.slice(17, -9)
//   const newDate = date.slice(16, -11)
//   const day = time.slice(0, 3)
//   const dayTimeString = day + ' ' + newDate + ' ' + newTime
//   return dayTimeString
// }
