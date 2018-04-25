import React, {Component} from 'react'
import NavBar from './NavBar'
import LocationPage from './LocationPage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchLocation } from  '../actions/actions';


class LandingPage extends Component {

  componentDidMount = () => {
    this.props.fetchLocation("new york ny")
  }

  render(){
    return(
      <div>
        <NavBar />
        <LocationPage />
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchLocation: fetchLocation
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LandingPage)
