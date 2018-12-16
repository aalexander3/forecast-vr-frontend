import { combineReducers } from 'redux';
import selectReducer from './selectReducer'
import defaultReducer from './defaultReducer'
import locationReducer from './locationReducer'
import cityReducer from './cityReducer'
import hourReducer from './hourReducer'

const rootReducer = combineReducers({
  locations: locationReducer,
  selectedLocation: selectReducer,
  defaultLocations: defaultReducer,
  whichCities: cityReducer,
  whichHour: hourReducer
})

export { rootReducer }
