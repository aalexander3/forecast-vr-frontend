import React from 'react'
import { Button } from 'antd'

const ButtonCard = (props) => {

  const sendTheClickRequest = (e) => {
    props.addNewLocation(props.location)
  }
  return <Button className='buttons' type="secondary" style={{'margin':'.25rem .45rem', width: '8rem'}} onClick={sendTheClickRequest}> { props.location.full_city_name } </Button>
}

export default ButtonCard
