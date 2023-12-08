import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, 
         signOut, 
         onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import './App.css'

const firebaseConfig = {
  apiKey: "AIzaSyAfjUQwdDou8iChKP2hYkvkhEwfkmctxsM",
  authDomain: "hofman-chat.firebaseapp.com",
  projectId: "hofman-chat",
  storageBucket: "hofman-chat.appspot.com",
  messagingSenderId: "761428687181",
  appId: "1:761428687181:web:000ed4b4d895bc13391f04"
};
 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

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
        <Home 
          app={app}
          handleSignOut={handleSignOut} 
          user={user}
          setUser={setUser}
        />
      ) : (
        <LoginPage 
          app={app}
        />
      )}
    </>
  );
};

export default App;