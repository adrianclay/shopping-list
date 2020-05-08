import React from 'react';
import './App.css';
import firebase from "firebase";

interface AppProps {
  firebase: firebase.app.App
}

function App(props: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        Shopping List
      </header>
    </div>
  );
}

export default App;
