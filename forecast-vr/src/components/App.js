import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage'
import Sun from './Sun'
import { bindActionCreators, compose } from 'redux';
import { newFetchLocation } from  '../actions/actions';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {

  state = {
    which: "first",
  }

  componentDidMount = () => {
    this.doThisOnce()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.locations.length === 3) {
      return true
    } else {
      return false
    }
  }

  // componentDidUpdate = (prevProps, prevState, snapshot) => {
  //   console.log('heyo from did update');
  //   console.log('prev props are', prevProps.whichCities);
  //   console.log('current props are', this.props.whichCities);
  //   if (this.props.whichCities !== prevProps.whichCities) {
  //     this.doThisOnce()
  //   }
  // }

  whichCities = (cities) => {
    switch (cities) {
      case "first":
        return this.props.defaultLocations.slice(0,3)
      case "second":
        return this.props.defaultLocations.slice(3,6)
      case "third":
        return this.props.defaultLocations.slice(6,9)
      case "fourth":
        return this.props.defaultLocations.slice(9,12)
      default:
        this.props.defaultLocations.slice(0,3)
    }
  }

  findLocation = (cityName) => {
    return this.props.locations.find(city => city.full_city_name === cityName)
  }

  doThisOnce = () => {
    // let whichCities = this.props.whichCities
    // console.log(whichCities[whichCities.length -1]);
    // this.props.newFetchLocation(whichCities[whichCities.length -1])
    Promise.all(this.props.defaultLocations.slice(0,3).map(city => this.props.newFetchLocation(city)))
      .then((values) => {console.log('promise all', values)})
  }

  render() {

    return (
      <div>
        <Switch>
          <Route exact path='/' component={ LandingPage } />

          <Route path="/new-york-city" render={() => <Sun city={this.findLocation("New York City")} /> } />
          <Route path="/london" render={() => <Sun city={this.findLocation("London")} /> } />
          <Route path="/paris" render={() => <Sun city={this.findLocation("Paris")} /> } />
          <Route path="/delhi" render={() => <Sun city={this.findLocation("Delhi")} /> } />
          <Route path="/istanbul" render={() => <Sun city={this.findLocation("Istanbul")} /> } />
          <Route path="/sao-paulo" render={() => <Sun city={this.findLocation("Sao Paulo")} /> } />
          <Route path="/dubai" render={() => <Sun city={this.findLocation("Dubai")} /> } />
          <Route path="/sydney" render={() => <Sun city={this.findLocation("Sydney")} /> } />
          <Route path="/seattle" render={() => <Sun city={this.findLocation("Seattle")} /> } />
          <Route path="/mexico-city" render={() => <Sun city={this.findLocation("Mexico City")} /> } />
          <Route path="/cairo" render={() => <Sun city={this.findLocation("Cairo")} /> } />
          <Route path="/moscow" render={() => <Sun city={this.findLocation("Moscow")} /> } />
          <Route path="/kiruna" render={() => <Sun city={this.findLocation("Kiruna")} /> } />
          <Route path="/husavik" render={() => <Sun city={this.findLocation("Husavik")} /> } />
          <Route path="/denver" render={() => <Sun city={this.findLocation("Denver")} /> } />

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
    defaultLocations: state.defaultLocations,
    whichCities: state.whichCities
  }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
// export default App;
