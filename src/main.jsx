import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfjUQwdDou8iChKP2hYkvkhEwfkmctxsM",
  authDomain: "hofman-chat.firebaseapp.com",
  projectId: "hofman-chat",
  storageBucket: "hofman-chat.appspot.com",
  messagingSenderId: "761428687181",
  appId: "1:761428687181:web:000ed4b4d895bc13391f04"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
