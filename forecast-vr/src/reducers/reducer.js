import { combineReducers } from 'redux';

let defaultLocations = [
    {
      full_city_name: "New York City",
      latitude: 40.71,
      longitude: -74.00
    }, {
      full_city_name: "London",
      latitude: 51.50,
      longitude: -0.12
    }, {
      full_city_name: "Paris",
      latitude: 48.85,
      longitude: 2.35
    }, {
      full_city_name: "Moscow",
      latitude: 55.75,
      longitude: 37.61
    }, {
      full_city_name: "Delhi",
      latitude: 28.70,
      longitude: 77.10
    },
    {
      full_city_name: "Istanbul",
      latitude: 41.00,
      longitude: 28.97
    },
    {
      full_city_name: "Dubai",
      latitude: 25.20,
      longitude: 55.27
    },
    {
      full_city_name: "Sao Paulo",
      latitude: -23.55,
      longitude: -46.63
    },
    {
      full_city_name: "Mexico City",
      latitude: 19.43,
      longitude: -99.13
    },
    {
      full_city_name: "Sydney",
      latitude: -33.86,
      longitude: 151.20
    },
    {
      full_city_name: "Seattle",
      latitude: 47.60,
      longitude: -122.33
    },
    {
      full_city_name: "Cairo",
      latitude: 30.04,
      longitude: 31.23
    }
]

function defaultReducer(state = defaultLocations, action){
  switch (action.type) {
    default:
      return state
  }
}

function locationReducer(state = [], action){
  switch (action.type) {
    case 'ADD_LOCATION':
      return [...state, action.location]
    case 'START_ADD_LOCATION_REQUEST':
      return [...state]
    case 'DELETE_LOCATION':
      let index = state.indexOf(action.location)
      let firstPart = [...state.slice(0, index)]
      let secondpart = [...state.slice(index+1)]
      return [...firstPart, ...secondpart]
    default:
      return [...state]
  }
}

// function fetchReducer(state = {}, action){
//   switch (action.type) {
//     case 'FETCH_LOCATION':
//       return action.location
//     default:
//       return state
//   }
// }

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
  defaultLocations: defaultReducer
  // fetchLocation: fetchReducer
})

export { rootReducer }
