import { combineReducers } from 'redux';

let defaultLocations = [
    {
      full_city_name: "New York City",
      latitude: 40.71,
      longitude: -74.00
    }, {
      full_city_name: "Husavik",
      latitude: 66.04,
      longitude: 17.33
    }, {
      full_city_name: "Denver",
      latitude: 39.73,
      longitude: -104.99
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
    }, {
      full_city_name: "Kiruna",
      latitude: 67.85,
      longitude: 20.22
    }
]

let defaultCities = [{
  full_city_name: "New York City",
  latitude: 40.71,
  longitude: -74.00,

}]

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
    case "BATCH_LOCATIONS":
      return action.locations
    case 'DELETE_LOCATION':
      let index = state.indexOf(action.location)
      let firstPart = [...state.slice(0, index)]
      let secondpart = [...state.slice(index+1)]
      return [...firstPart, ...secondpart]
    default:
      return [...state]
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

function cityReducer(state = [], action){
  switch (action.type) {
    case 'ADD_CITY':
      return [...state, action.location]
    case 'DELETE_CITY':
      let index = state.indexOf(action.location)
      let firstPart = [...state.slice(0, index)]
      let secondpart = [...state.slice(index+1)]
      return [...firstPart, ...secondpart]
    default:
      return state
  }
}

function hourReducer(state = [], action){
  switch (action.type) {
    case "INCREMENT":
      if (state.length < 48){
      return [...state, action.type]
    } else {
      return [...state]
    }
    case "DECREMENT":
      if (state.length > 0){
      return state.slice(0,-1)
    } else {
      return state
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  locations: locationReducer,
  selectedLocation: selectReducer,
  defaultLocations: defaultReducer,
  whichCities: cityReducer,
  whichHour: hourReducer
})

export { rootReducer }
