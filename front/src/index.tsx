import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import {compose, createStore} from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from "./reducers/root-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: any;
    }
}
const store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Provider store={store}>
            <App />
          </Provider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);