import React from 'react'
import '../styles/NavBar.css'
import TitleCard from './TitleCard'
// import SearchBar from './SearchBar'
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
