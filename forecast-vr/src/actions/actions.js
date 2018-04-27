export let addLocation = location => {
  return { type: 'ADD_LOCATION', location: location };
}

export let deleteLocation = location => {
  return { type: 'DELETE_LOCATION', location: location }
}

export let deleteDetail = location => {
  return { type: 'DELETE_DETAIL', location: location}
}

export let selectLocation = location => {
  return (dispatch) => {
    dispatch({ type: 'START_ADD_LOCATION_REQUEST' });
    return fetch(process.env.REACT_APP_DARK_SKY_QUERY + location.latitude + ',' + location.longitude)
      .then(res => res.json()).then(json => {
        console.log(json)

        let {time, temperature, summary: shortSummary, windSpeed} = json.currently
        let {latitude, longitude} = json
        let {summary: dailySummary} = json.daily
        let {sunriseTime, sunsetTime} = json.daily.data[0]

        let newDate = new Date(parseInt(`${time}000`)).toLocaleString()
        let sunrise = new Date(parseInt(`${sunriseTime}000`)).toLocaleTimeString()
        let sunset = new Date(parseInt(`${sunsetTime}000`)).toLocaleTimeString()

        dispatch({
          type: 'SELECT_LOCATION',
          location: {
            full_city_name: location.full_city_name,
            latitude: latitude,
            longitude: longitude,
            obs_time: location.obs_time,
            temp: location.temp,
            conditions: location.conditions,
            windSpeed: windSpeed,
            dailySummary: dailySummary,
            sunriseTime: sunrise,
            sunsetTime: sunset
          }
        })
      })
  }
}


export let fetchLocation = location => {
  return (dispatch) => {
    dispatch({ type: 'DELETE_DETAIL' });
    return fetch(process.env.REACT_APP_QUERY_API_URL + location + '.json')
      .then(response => response.json())
      .then(json => {
        if (json.response.results) {
          console.log({response: 'please enter your query in city state format'});
        } else {
          console.log(json.current_observation)
          let {display_location, temp_f, weather, wind_mph, local_time_rfc822: local_time, observation_time, precip_1hr_in} = json.current_observation
          let dayTimeString = stringifyDate(observation_time, local_time)
          let citySlug = display_location.full.toLowerCase().replace(/, | /gi, "-")

          dispatch({
            type: 'ADD_LOCATION',
            location: {
              full_city_name: display_location.full,
              temp: temp_f,
              conditions: weather,
              wind: wind_mph,
              obs_time: dayTimeString,
              precip: precip_1hr_in,
              latitude: display_location.latitude,
              longitude: display_location.longitude,
              citySlug: citySlug
            }
          })
        }
      })
  };
}

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
