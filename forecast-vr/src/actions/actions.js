export let addLocation = (location) => {
  return { type: 'ADD_LOCATION', location: location };
}


export let fetchLocation = (location) => {
  return (dispatch) => {
    dispatch({ type: 'START_ADD_LOCATION_REQUEST' });
    return fetch(process.env.REACT_APP_QUERY_API_URL + location + '.json')
      .then(response => response.json())
      .then(json => {
        if (json.response.results) {
          console.log({response: 'please enter your query in city state format'});
        } else {
          console.log(json.current_observation)
          let {display_location, temp_f, weather, wind_mph, local_time_rfc822: local_time, observation_time} = json.current_observation
          console.log(temp_f, weather, wind_mph, local_time);
          console.log(display_location.full);
          dispatch({
            type: 'ADD_LOCATION',
            location: {
              full_city_name: display_location.full,
              temp: temp_f,
              conditions: weather,
              wind: wind_mph,
              local_time: local_time,
              obs_time: observation_time
            }
          })
        }
      })
  };
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
