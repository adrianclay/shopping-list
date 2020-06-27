import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppConstructor from './App';
import * as serviceWorker from './serviceWorker';
import initFirebase from "./initFirebase";
import LoginConstructor from './Login';
import AuthenticationService from './services/AuthenticationService';

initFirebase().then(firebase => {
    const Login = LoginConstructor(new AuthenticationService(firebase));
    const App = AppConstructor(Login, firebase);

    ReactDOM.render(<App />, document.getElementById('root'));
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
