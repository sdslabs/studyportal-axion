import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render((
    <Provider store={ store }>
        <BrowserRouter>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
