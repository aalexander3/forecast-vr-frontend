const hourReducer = (state = [], action) => {
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
    case "CHANGE_HOUR_TO":
      return new Array(action.payload).fill("INCREMENT")
    default:
      return state
  }
}

export default hourReducer
