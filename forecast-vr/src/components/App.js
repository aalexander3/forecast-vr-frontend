import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage'

import Sun from './Sun'
import { bindActionCreators } from 'redux';
import { newFetchLocation } from  '../actions/actions';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {

  state = {
    done: false
  }

  componentDidMount = () => {
    (!this.state.done) ? this.doThisOnce() : null
    // this.props.newFetchLocation({
    //   full_city_name: "New York City",
    //   latitude: 40.71,
    //   longitude: -74.00
    // })
    // this.props.defaultLocations.forEach(city => this.props.newFetchLocation(city))
  }

  findLocation = (cityName) => {
    return this.props.locations.find(city => city.full_city_name === cityName)
  }

  doThisOnce = () => {
    this.setState({
      done: true
    })
    this.props.defaultLocations.forEach(city => this.props.newFetchLocation(city))
  }

  render() {

    return (
      <div>
        <Switch>
          <Route exact path='/' component={ LandingPage } />

          <Route path="/new-york-city" render={() => <Sun location={this.findLocation("New York City")} /> } />
          <Route path="/london" render={() => <Sun location={this.findLocation("London")} /> } />
          <Route path="/delhi" render={() => <Sun location={this.findLocation("Delhi")} /> } />
          <Route path="/istanbul" render={() => <Sun location={this.findLocation("Istanbul")} /> } />
          <Route path="/sao-paulo" render={() => <Sun location={this.findLocation("Sao Paulo")} /> } />
          <Route path="/dubai" render={() => <Sun location={this.findLocation("Dubai")} /> } />
          <Route path="/sydney" render={() => <Sun location={this.findLocation("Sydney")} /> } />
          <Route path="/paris" render={() => <Sun location={this.findLocation("Paris")} /> } />
          <Route path="/seattle" render={() => <Sun location={this.findLocation("Seattle")} /> } />
          <Route path="/mexico-city" render={() => <Sun location={this.findLocation("Mexico City")} /> } />
          <Route path="/cairo" render={() => <Sun location={this.findLocation("Cairo")} /> } />
          <Route path="/moscow" render={() => <Sun location={this.findLocation("Moscow")} /> } />

        </Switch>
        {/* {(this.props.locations.length > 0) ? this.makeRoutes() : null} */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    newFetchLocation: newFetchLocation
  }, dispatch)
}

const mapStateToProps = state => {
  console.log('mapping', state.locations);
  return {
    locations: state.locations,
    defaultLocations: state.defaultLocations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
// export default App;
