import 'typeface-roboto';
import 'index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import registerServiceWorker from 'registerServiceWorker';
import configureStore from "store";
import {Provider} from "react-redux";

registerServiceWorker();

const rootEl = document.getElementById('root');
const store = configureStore();

renderApp();
if (module.hot) {
  module.hot.accept('components/App', renderApp);
}

function renderApp() {

  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , rootEl);
}
