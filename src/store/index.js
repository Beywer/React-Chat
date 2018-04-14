import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from 'reducers';

export default function configureStore() {
  let store;
  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      rootReducer,
      applyMiddleware(thunkMiddleware),
    );
  } else {
    const devToolsCompose = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true }) :
      null;
    const composeEnhancers = devToolsCompose || compose;
    store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunkMiddleware, logger)),
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
}
