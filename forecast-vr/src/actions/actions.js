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
  let {time, temperature, summary: shortSummary, icon, windSpeed, cloudCover, humidity} = json.currently
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
    humidity: humidity,
    conditions: shortSummary,
    windSpeed: windSpeed,
    dailySummary: dailySummary,
    sunriseTime: sunrise,
    sunsetTime: sunset,
    citySlug: citySlug,
    hourly: hourly,
    icon: icon,
    cloudCover: cloudCover,
    offset: json.offset,
    daily: data
  }
}


export let newFetchLocation = location => {
  console.log('starting fetch for', location);
  // return (dispatch) => {
  //   // dispatch({ type: 'START_ADD_LOCATION_REQUEST' });
    return fetch(process.env.REACT_APP_DARK_SKY_QUERY + location.latitude + ',' + location.longitude + "?exclude=flags,minutely")
      .then(res => res.json()).then(json => {
        return {location: getVars(json, location)}
        // dispatch({
        //   type: 'DO_NOTHING_FOR_NOW',
        //   location: getVars(json, location)
        // })
      // })
  })
}



// export let fetchLocation = location => {
//   return (dispatch) => {
//     dispatch({ type: 'DELETE_DETAIL' });
//     return fetch(process.env.REACT_APP_QUERY_API_URL + location + '.json')
//       .then(response => response.json())
//       .then(json => {
//         if (json.response.results) {
//           console.log({response: 'please enter your query in city state format'});
//         } else {
//           console.log(json.current_observation)
//           let {display_location, temp_f, weather, wind_mph, local_time_rfc822: local_time, observation_time, precip_1hr_in} = json.current_observation
//           let dayTimeString = stringifyDate(observation_time, local_time)
//           let citySlug = display_location.full.toLowerCase().replace(/, | /gi, "-")
//
//           dispatch({
//             type: 'ADD_LOCATION',
//             location: {
//               full_city_name: display_location.full,
//               temp: temp_f,
//               conditions: weather,
//               wind: wind_mph,
//               obs_time: dayTimeString,
//               precip: precip_1hr_in,
//               latitude: display_location.latitude,
//               longitude: display_location.longitude,
//               citySlug: citySlug
//             }
//           })
//         }
//       })
//   };
// }

// export let newFetchLocation = (lat, long, cityName) => {
//   return (dispatch) => {
//     dispatch({ type: 'START_ADD_LOCATION_REQUEST' });
//     return fetch(process.env.REACT_APP_DARK_SKY_QUERY + lat +','+long)
//       .then(res => res.json()).then(json => {
//         console.log(json)
//
//         let {time, temperature, summary: shortSummary, windSpeed} = json.currently
//         let {latitude, longitude} = json
//         let {summary: dailySummary} = json.daily
//         let {sunriseTime, sunsetTime} = json.daily.data[0]
//
//         let newDate = new Date(parseInt(`${time}000`)).toLocaleString()
//
//         dispatch({
//           type: 'ADD_LOCATION',
//           location: {
//             full_city_name: cityName,
//             latitude: latitude,
//             obs_time: newDate,
//             temp: temperature,
//             conditions: shortSummary,
//             windSpeed: windSpeed,
//             dailySummary: dailySummary,
//             sunriseTime: sunriseTime,
//             sunsetTime: sunsetTime
//           }
//         })
//       })
//   }
// }

const stringifyDate = (date, time) => {
  const newTime = time.slice(17, -9)
  const newDate = date.slice(16, -11)
  const day = time.slice(0, 3)
  const dayTimeString = day + ' ' + newDate + ' ' + newTime
  return dayTimeString
}

// export let fetchInitial = () => {
//   return (dispatch) => {
//     dispatch({ type: 'START_ADD_LOCATION_REQUEST' });
//   return fetch(process.env.REACT_APP_AUTO_IP_URL)
//     .then(response => response.json())
//     .then(json => console.log(json))
//         // dispatch({
//         //   type: 'ADD_LOCATION',
//         //   location: {
//         //     full_city_name: display_location.full,
//         //     temp: temp_f,
//         //     conditions: weather,
//         //     wind: wind_mph,
//         //     local_time: local_time
//         //   }
//         // })
//   }
// }
