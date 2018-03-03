import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );
  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }
  return store;
}
