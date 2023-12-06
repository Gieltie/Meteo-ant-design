/* import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import './App.css'

const App = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); */

  /* const viewLoggedOut = document.getElementById("logged-out-view")
  const viewLoggedIn = document.getElementById("logged-in-view") */

  /* showLoggedOutView()

  
  */
 
 import { useState } from "react";
 import { FcGoogle } from "react-icons/fc";
 import { LuLogOut } from "react-icons/lu";
 import { getAuth, 
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword } from "firebase/auth";
 
 import './App.css'
 import { initializeApp } from "firebase/app";

 const firebaseConfig = {
   apiKey: "AIzaSyAfjUQwdDou8iChKP2hYkvkhEwfkmctxsM",
   authDomain: "hofman-chat.firebaseapp.com",
   projectId: "hofman-chat",
   storageBucket: "hofman-chat.appspot.com",
   messagingSenderId: "761428687181",
   appId: "1:761428687181:web:000ed4b4d895bc13391f04"
 };
 
 
 const App = () => {
   const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleSignInWithGoogle = () => {
    console.log('Sign in with Google');
  }

  /* const handleSignIn = () => {
    console.log(`Email: ${email}, Password: ${password}`);
    setIsLoggedIn(true);
  } */
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      console.log(`Signed in as ${user.email}`);
      setIsLoggedIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error: ${errorCode} ${errorMessage}`);
    }
  }

  const newAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setIsLoggedIn(true);
    })
    .catch((error) => {
      console.log(error.message)
    });
    console.log('Create account');
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="container">
          <nav>
            <LuLogOut onClick={() => setIsLoggedIn(false)}/>
          </nav>
          <h1>Welcome, you are logged in!</h1>
        </div>
      ) : (
        <div className="container">
          <h1 className="app-title">Hofman Chat</h1>
          
          <div className="provider-buttons">
            <button id="sign-in-with-google-btn" className="provider-btn" onClick={handleSignInWithGoogle}>
              <FcGoogle className="google-btn-logo"/>
              Sign in with Google
            </button>
          </div>
          
          <div className="auth-fields-and-buttons">
            <input id="email-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input id="password-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button id="sign-in-btn" className="primary-btn" onClick={handleSignIn}>Sign in</button>
            <button id="create-account-btn" className="secondary-btn" onClick={newAccount}>Create account</button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;