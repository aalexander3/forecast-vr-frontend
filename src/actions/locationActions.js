import Adapter from '../adapters/Adapter'
import { getVars } from './actionHelper'

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
    return Adapter.get(location)
      .then(json => {
        dispatch({
          type: 'SELECT_LOCATION',
          location: getVars(json, location)
        })
      })
  }
}

export let addCityToWhich = location => {
  return { type: 'ADD_CITY', location: location}
}

export let newFetchLocation = location => {
    return Adapter.get(location)
      .then(json => {
        return {location: getVars(json, location)}
  })
}
