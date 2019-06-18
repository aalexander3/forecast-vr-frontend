import React from 'react'
import TitleCard from './TitleCard'
import LocationButtons from './LocationButtons'
import Incrementer from './Incrementer'
import Footer from './Footer'

const NavBar = () => {
  return(
    <div id="nav-bar">
      <TitleCard />
      <div id='bottom-nav'>
        <h1>What's it like in... </h1>
        <LocationButtons />
        <Incrementer />
      </div>
      <Footer />
    </div>
  )
}

export default NavBar
