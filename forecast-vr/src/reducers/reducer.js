import { combineReducers } from 'redux';

function locationReducer(state = [], action){
  switch (action.type) {
    case 'ADD_LOCATION':
      return [...state, action.location]
    case 'START_ADD_LOCATION_REQUEST':
      return state
    case 'DELETE_LOCATION':
      let index = state.indexOf(action.location)
      let firstPart = [...state.slice(0, index)]
      let secondpart = [...state.slice(index+1)]
      return [...firstPart, ...secondpart]
    default:
      return state
  }
}

function fetchReducer(state = {}, action){
  switch (action.type) {
    case 'FETCH_LOCATION':
      return action.location
    default:
      return state
  }
}

function selectReducer(state = null, action){
  switch (action.type) {
    case 'SELECT_LOCATION':
      return action.location
    case 'DELETE_DETAIL':
      return null
    default:
      return state
  }
}

const rootReducer = combineReducers({
  locations: locationReducer,
  selectedLocation: selectReducer,
  fetchLocation: fetchReducer
})

export { rootReducer }
