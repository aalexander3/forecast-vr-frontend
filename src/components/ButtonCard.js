import React from 'react'
import { Button } from 'antd'

const ButtonCard = ({ location, addNewLocation }) => {

  const sendTheClickRequest = e => {
    addNewLocation(location)
  }

  return (
    <Button
      className='buttons'
      type="secondary"
      onClick={sendTheClickRequest}>
      { location.full_city_name }
    </Button>
  )
}

export default ButtonCard
