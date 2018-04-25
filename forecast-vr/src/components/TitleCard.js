import React from 'react'
import '../styles/TitleCard.css'
import {emojify} from 'react-emojione';
import { Divider} from 'antd'

const TitleCard = () => {

  return(
    <div id="title-card">
      <h1 className='title-title'>F{emojify(':sunny:')}RECAST {emojify(':cloud_tornado:')}R</h1>

      <h3>Tomorrow's view on today's weather</h3>
      <br/><br/>
      <h3>CURRENT LOCATION</h3>
      <h3>CURRENT TIME</h3>
      <Divider style={{width: '80%', display: 'inline-block'}}/>
    </div>
  )
}

export default TitleCard
