import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage'
import Rain from './Rain'
import Snow from './Snow'
import Sun from './Sun'
import Fog from './Fog'
import Cloud from './Cloud'
import Storm from './Storm'
import { bindActionCreators } from 'redux';
import { newFetchLocation } from  '../actions/actions';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'


class App extends Component {

  componentDidMount = () => {
    this.props.newFetchLocation({
      full_city_name: "New York City",
      latitude: 40.71,
      longitude: -74.00
    })
  }

  // makeRoutes = () => {
  //   debugger
  //   if (this.props.locations.length > 0) {
  //     return this.props.locations.map(loc => {
  //       return <Route path={"/" + loc.citySlug} render={() => <Snow /> } />
  //     })
  //   }
  // }

  findLocation = (cityName) => {
    return this.props.locations.find(city => city.full_city_name === cityName)
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

          {/* {(this.props.locations.length > 0) ? this.makeRoutes() : null} */}
        </Switch>
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
  return {locations: state.locations}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
