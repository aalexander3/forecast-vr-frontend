import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage'
import Sun from './Sun'
import { bindActionCreators, compose } from 'redux';
import { newFetchLocation, batchFetch, getVars } from  '../actions/actions';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {
  componentDidMount = () => {
    this.doThisOnce()
  }

  appFetch = (location) => {
    return fetch(process.env.REACT_APP_DARK_SKY_QUERY + location.latitude + ',' + location.longitude + "?exclude=flags,minutely")
      .then(res => res.json()).then(json => {
        return getVars(json, location)
    })
  }

  findLocation = (cityName) => {
    return this.props.locations.find(city => city.full_city_name === cityName)
  }

  doThisOnce = () => {
    Promise.all(this.props.defaultLocations.map(city => this.appFetch(city)))
      .then((locations) => {
        this.props.batchFetch(locations)
      })
  }

  render() {

    return (
      <div>
        <Switch>
          <Route exact path='/' component={ LandingPage } />

          <Route path="/new-york-city" render={() => <Sun city={this.findLocation("New York City")} /> } />
          <Route path="/sao-paulo" render={() => <Sun city={this.findLocation("Sao Paulo")} /> } />
          <Route path="/buenos-aires" render={() => <Sun city={this.findLocation("Buenos Aires")} /> } />
          <Route path="/london" render={() => <Sun city={this.findLocation("London")} /> } />
          <Route path="/paris" render={() => <Sun city={this.findLocation("Paris")} /> } />
          <Route path="/cairo" render={() => <Sun city={this.findLocation("Cairo")} /> } />
          <Route path="/istanbul" render={() => <Sun city={this.findLocation("Istanbul")} /> } />
          <Route path="/dubai" render={() => <Sun city={this.findLocation("Dubai")} /> } />
          <Route path="/karachi" render={() => <Sun city={this.findLocation("Karachi")} /> } />
          <Route path="/delhi" render={() => <Sun city={this.findLocation("Delhi")} /> } />
          <Route path="/jakarta" render={() => <Sun city={this.findLocation("Jakarta")} /> } />
          <Route path="/beijing" render={() => <Sun city={this.findLocation("Beijing")} /> } />
          <Route path="/tokyo" render={() => <Sun city={this.findLocation("Tokyo")} /> } />
          <Route path="/sydney" render={() => <Sun city={this.findLocation("Sydney")} /> } />
          <Route path="/auckland" render={() => <Sun city={this.findLocation("Auckland")} /> } />
          <Route path="/honolulu" render={() => <Sun city={this.findLocation("Honolulu")} /> } />
          <Route path="/anchorage" render={() => <Sun city={this.findLocation("Anchorage")} /> } />
          <Route path="/seattle" render={() => <Sun city={this.findLocation("Seattle")} /> } />
          <Route path="/denver" render={() => <Sun city={this.findLocation("Denver")} /> } />
          <Route path="/mexico-city" render={() => <Sun city={this.findLocation("Mexico City")} /> } />
          <Route path="/cayambe" render={() => <Sun city={this.findLocation("Cayambe")} /> } />

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
