import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from 'reducers';
import rootSaga from 'sagas';
import initialState from 'initialState';


const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
  const store = createStore(
    // connectRouter(history)(rootReducer),
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
    )),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
