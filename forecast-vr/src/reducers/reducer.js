import { combineReducers } from 'redux';

function locationReducer(state = [], action){
  switch (action.type) {
    case 'ADD_LOCATION':
      return [...state, action.location]
    case 'START_ADD_LOCATION_REQUEST':
      return state
    default:
      return state
  }
}

function defaultReducer(state = {}, action){
  switch (action.type) {
    case 'INIT_LOCATION':
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  locations: locationReducer,
  defaultLocation: defaultReducer
})

export { rootReducer }
