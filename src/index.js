import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './ReduxStore/reducer';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
