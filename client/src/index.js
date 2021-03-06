import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>, rootElement);
} else {
  ReactDOM.render(
    <Provider store={store}>
     <Router>
       <ScrollToTop />
       <PersistGate persistor={persistor}>
         <App />
       </PersistGate>
     </Router>
    </Provider>, rootElement)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
