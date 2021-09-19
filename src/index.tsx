import ReactDOM from 'react-dom';
import './index.css';
import AppConstructor from './App';
import * as serviceWorker from './serviceWorker';
import initFirebase from "./initFirebase";
import { getFirestore } from 'firebase/firestore';
import AuthenticationService from './services/AuthenticationService';

initFirebase().then(firebase => {
    const App = AppConstructor(new AuthenticationService(firebase), getFirestore(firebase));

    ReactDOM.render(<App />, document.getElementById('root'));
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
