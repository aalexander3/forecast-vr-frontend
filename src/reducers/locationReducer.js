const locationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return [...state, action.location]
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

export default locationReducer
