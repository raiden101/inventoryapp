import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

import axios from 'axios';
import { getToken } from './util/tokenManagement';

axios.interceptors.request.use(config => {
  config.headers['token'] = getToken();
  return config;
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />  
    </BrowserRouter>
  </Provider>
 , 
  document.getElementById('root')
);

registerServiceWorker();
