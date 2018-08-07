import React, {Component} from 'react'
import NavBar from './NavBar'
import LocationPage from './LocationPage'

class LandingPage extends Component {

  render(){
    return(
      <div>
        <NavBar />
        <LocationPage />
      </div>
    )
  }
}

export default LandingPage
