

function cityReducer(state = [], action){
  switch (action.type) {
    case 'ADD_CITY':
      if (state.includes(action.location)){
        return [...state]
      } else {
          return [...state, action.location]
      }
    case 'DELETE_CITY':
      let index = state.indexOf(action.location)
      let firstPart = [...state.slice(0, index)]
      let secondpart = [...state.slice(index+1)]
      return [...firstPart, ...secondpart]
    default:
      return state
  }
}

export default cityReducer
