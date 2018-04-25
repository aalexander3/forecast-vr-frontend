import React from 'react'
import '../styles/NavBar.css'
import TitleCard from './TitleCard'
import SearchBar from './SearchBar'

const NavBar = () => {
  return(
    <div id="nav-bar">
      <TitleCard />
      <div id='bottom-nav'>
        <SearchBar />
        <h3>IMPORT BUTTON FORECASTERSSSS HERE</h3>
      </div>
    </div>
  )
}

export default NavBar
