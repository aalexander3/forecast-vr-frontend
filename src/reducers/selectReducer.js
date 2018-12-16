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

export default selectReducer
