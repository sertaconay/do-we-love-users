import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore, { history } from 'store';
import App from 'containers/App';


const store = configureStore();

const appRoot = document.getElementById('app');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  appRoot,
);
