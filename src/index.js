import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers/reducer.js'
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config()

const store = createStore(rootReducer, compose(applyMiddleware(thunk),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 ));

store.subscribe(() => {
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
   document.getElementById('root'));
// registerServiceWorker();

// store.dispatch({type: '@@INIT'})
