export let incrementHour = () => {
  return {type: 'INCREMENT'}
}

export let changeHour = (hour) => {
  return {type: 'CHANGE_HOUR_TO', payload: hour}
}

export let decrementHour = () => {
  return {type: 'DECREMENT'}
}
