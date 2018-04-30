import React from 'react'
import { Button } from 'antd'

const ButtonCard = (props) => {

  const sendTheClickRequest = (e) => {
    props.addNewLocation(props.location)
  }

  return <Button type="primary" style={{'margin':'.25rem', width: '8rem', backgroundColor: '#F1C1BA', border: 'solid #F1C1BA .25px'}} onClick={sendTheClickRequest}> { props.location.full_city_name } </Button>
}

export default ButtonCard
