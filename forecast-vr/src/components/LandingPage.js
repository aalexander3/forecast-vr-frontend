import React, {Component} from 'react'
import NavBar from './NavBar'
import LocationPage from './LocationPage'


export default class LandingPage extends Component {

  render(){
    return(
      <div>
        <NavBar />
        <LocationPage />
      </div>
    )
  }
}
