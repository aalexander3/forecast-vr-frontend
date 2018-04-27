import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage'
import SearchBar from './SearchBar'
import Rain from './Rain'
import Snow from './Snow'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'

class App extends Component {

  mapRoutes = () => {
    return this.props.locations.map(loc => {
      return <Route exact path={"/" + loc.citySlug} render={<Rain />}/>
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          {this.props.locations.length > 0 ? this.mapRoutes() : null}
          {/* <Route exact path='/rain' component={Rain} />
          <Route exact path='/snow' component={Snow} /> */}
        </Switch>
      </div>
    );
  }
}

const getComponent = (location) => {
  switch (location.conditions) {
    case "Overcast": case "Partly Cloudy": case "Mostly Cloudy": case "Scattered Clouds": case "Cloudy":
      return 'https://media2.giphy.com/media/26BGDQxDCZDFHW5Ne/giphy.gif'
    case "Clear": case "Sunny": case "Mostly Sunny": case "Partly Sunny":
      return "https://media1.giphy.com/media/26u6dryuZH98z5KuY/giphy.gif"
    case "Snow": case "Sleet":
      return <Snow location={location} />
    case "Rain": case "Freezing Rain": case "Flurries": case "Light Rain":
      return <Rain location={location} />
    case "Thunderstorm": case "Thunderstorms":
      return 'https://media2.giphy.com/media/ESfdA1EX02VW/giphy.gif'
    case "Fog": case "Haze":
      return 'https://media2.giphy.com/media/26BGDQxDCZDFHW5Ne/giphy.gif'
    default:
      return 'https://media1.giphy.com/media/26BREnyYXsPOxlUKk/giphy.gif'
  }
}

const mapStateToProps = state => {
  return {locations: state.locations}
}


export default connect(mapStateToProps)(App);
