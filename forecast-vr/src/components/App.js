import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage'
import SearchBar from './SearchBar'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    console.log(process.env.REACT_APP_QUERY_API_URL);
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/rain' component={SearchBar} />
        </Switch>
      </div>
    );
  }
}

export default App;
