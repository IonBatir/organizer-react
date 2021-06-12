import React, { createContext } from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FIREBASE_CONFIG } from "./environment";

firebase.initializeApp(FIREBASE_CONFIG);

const auth = firebase.auth();
const firestore = firebase.firestore();

export const Context = createContext({ auth, firestore });

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ auth, firestore }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
