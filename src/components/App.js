import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage'
import Adapter from '../adapters/Adapter'
import Sun from './Sun'
import Mars from './Mars'
import { bindActionCreators, compose } from 'redux';
import { newFetchLocation, batchFetch } from  '../actions/locationActions';
import { getVars } from  '../actions/actionHelper';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {
  componentDidMount = () => {
    this.doThisOnce()
  }

  appFetch = (location) => {
    return Adapter.get(location)
      .then(json => getVars(json, location))
  }

  doThisOnce = () => {
    Promise.all(this.props.defaultLocations.map(city => this.appFetch(city)))
      .then(locations => this.props.batchFetch(locations))
  }

  render() {

    return (
      <div>
        <Switch>
          <Route exact path='/' component={ LandingPage } />
          <Route exact path="/mars" render={() => <Mars /> } />
          <Route path='/:location' component={Sun} />
        </Switch>
      </div>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    newFetchLocation: newFetchLocation,
    batchFetch: batchFetch
  }, dispatch)
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    defaultLocations: state.defaultLocations,
    whichCities: state.whichCities,
    whichHour: state.whichHour
  }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
