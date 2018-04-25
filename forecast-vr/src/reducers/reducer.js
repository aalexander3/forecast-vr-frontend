import { combineReducers } from 'redux';

function locationReducer(state = [], action){
  switch (action.type) {
    case 'ADD_LOCATION':
      return [...state, action.location]
      break;
    default:
      return state
  }
}

function weatherReducer(state = [], action){
  switch (action.type) {
    case 'ADD_WEATHER':
      return state
      break;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  locations: locationReducer,
  weathers: weatherReducer
})

export { rootReducer }
