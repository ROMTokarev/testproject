import React from 'react';
import ReactDOM from 'react-dom';
import './react/assets/css/index.css';
import App from './react/index.js'
import * as serviceWorker from './serviceWorker';
import { Router, hashHistory as history } from 'react-router';
import Home from './react/home'
import 'typeface-roboto'

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    // <Router routes={routes} history={history} />,
    <Home />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
