import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage'
import SearchBar from './SearchBar'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import Rain from './Rain'
import Snow from './Snow'


class App extends Component {

  // getComponent = (location) => {
  //   switch (location.conditions) {
  //     case "Overcast": case "Partly Cloudy": case "Mostly Cloudy": case "Scattered Clouds": case "Cloudy":
  //       return <Snow location={location} />
  //     case "Clear": case "Sunny": case "Mostly Sunny": case "Partly Sunny":
  //       return <Snow location={location} />
  //     case "Snow": case "Sleet":
  //       return <Snow location={location} />
  //     case "Rain": case "Freezing Rain": case "Flurries": case "Light Rain":
  //       return <Rain location={location} />
  //     case "Thunderstorm": case "Thunderstorms":
  //       return <Snow location={location} />
  //     case "Fog": case "Haze":
  //       return <Snow location={location} />
  //     default:
  //       return <Snow location={location} />
  //   }
  // }


  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ LandingPage } />
          <Route path="/new-york-ny" component={ Snow } />
        </Switch>
      </div>
    );
  }
}



// const mapStateToProps = state => {
//   return {locations: state.locations}
// }

// export default connect(mapStateToProps)(App);
export default App;
