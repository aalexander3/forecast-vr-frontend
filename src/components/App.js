import React, { Component } from 'react';
import LandingPage from './LandingPage'
import Adapter from '../adapters/Adapter'
import Sun from './Sun'
import Mars from './Mars'
import { compose } from 'redux';
import { newFetchLocation, batchFetch } from  '../actions/locationActions';
import { getVars } from  '../actions/actionHelper';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {
  componentDidMount = () => {
    this.getAllCities()
  }

  appFetch = (location) => {
    return Adapter.get(location)
      .then(json => getVars(json, location))
  }

  getAllCities = () => {
    Promise.all(this.props.defaultLocations.map(city => this.appFetch(city)))
      .then(locations => this.props.batchFetch(locations))
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={ LandingPage } />
        <Route exact path='/mars' component={ Mars } />
        <Route path='/:location' component={ Sun } />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    defaultLocations: state.defaultLocations,
    whichCities: state.whichCities,
    whichHour: state.whichHour
  }
}

export default compose(withRouter, connect(mapStateToProps, { newFetchLocation, batchFetch }))(App);
