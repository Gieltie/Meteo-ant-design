import { useState, useEffect } from "react";
import { getAuth, 
        createUserWithEmailAndPassword,
        signInWithPopup,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        GoogleAuthProvider } from "firebase/auth";
import './App.css'
import { initializeApp } from "firebase/app";
import Home from "./components/Home";
import LoginPage from "./components/Login";

const firebaseConfig = {
  apiKey: "AIzaSyAfjUQwdDou8iChKP2hYkvkhEwfkmctxsM",
  authDomain: "hofman-chat.firebaseapp.com",
  projectId: "hofman-chat",
  storageBucket: "hofman-chat.appspot.com",
  messagingSenderId: "761428687181",
  appId: "1:761428687181:web:000ed4b4d895bc13391f04"
};
 
 
const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    
    return () => unsubscribe();
  }, [auth]);
  
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Signed in with Google');
    }).catch((error) => {
      console.log(error.message) ;
    });
  }
  
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(`Signed in as ${user.email}`);
      setEmail('');
      setPassword('');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error: ${errorCode} ${errorMessage}`);
    }
  }

  const newAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setEmail('');
      setPassword('');
    })
    .catch((error) => {
      console.log(error.message)
    });
    console.log('Create account');
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Home handleSignOut={handleSignOut}/>
      ) : (
        <LoginPage 
        handleSignInWithGoogle={handleSignInWithGoogle} 
        handleSignIn={handleSignIn} 
        newAccount={newAccount} 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
      />
      )}
    </>
  );
};

export default App;