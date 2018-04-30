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
import { fetchLocation } from  '../actions/actions';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'


class App extends Component {

  componentDidMount = () => {
    this.props.fetchLocation("new york ny")
  }

  // makeRoutes = () => {
  //   if (this.props.locations.length > 0) {
  //     return this.props.locations.map(loc => {
  //       return <Route path={"/" + loc.citySlug} render={() => <Snow /> } />
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ LandingPage } />
          <Route path="/snow" render={() => <Snow /> } />
          <Route path="/rain" render={() => <Rain /> } />
          <Route path="/sun" render={() => <Sun /> } />
          <Route path="/storm" render={() => <Storm /> } />
          <Route path="/fog" render={() => <Fog /> } />
          <Route path="/cloud" render={() => <Cloud /> } />

          {/* {(this.props.locations.length > 0) ? this.makeRoutes() : null} */}
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchLocation: fetchLocation
  }, dispatch)
}

const mapStateToProps = state => {
  return {locations: state.locations}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
