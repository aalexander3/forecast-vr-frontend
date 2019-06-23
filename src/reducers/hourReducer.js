const hourReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      if (state < 48){
      return state + 1
    } else {
      return state
    }
    case "DECREMENT":
      if (state > 0){
      return state - 1
    } else {
      return state
    }
    case "CHANGE_HOUR_TO":
      return action.payload
    default:
      return state
  }
}

export default hourReducer
