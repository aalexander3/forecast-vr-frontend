import React, {Component} from 'react'
import NavBar from './NavBar'
import LocationPage from './LocationPage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newFetchLocation } from  '../actions/actions';


class LandingPage extends Component {

  // componentDidMount = () => {
  //   this.props.newFetchLocation({
  //       full_city_name: "New York City",
  //       latitude: 40.71,
  //       longitude: -74.00
  //   })
  // }

  render(){
    return(
      <div>
        <NavBar />
        <LocationPage />
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({
//     newFetchLocation: newFetchLocation
//   }, dispatch)
// }

// export default connect(null, mapDispatchToProps)(LandingPage)
export default LandingPage
