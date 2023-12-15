import { useState } from 'react';
import { GoogleAuthProvider,
         signInWithPopup, 
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';


const LoginPage = ({ auth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const provider = new GoogleAuthProvider();
  
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Signed in with Google');
    }).catch((error) => {
      console.log(error.message) ;
    });
  }
  
  const handleSignIn = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Veuillez entrer une adresse e-mail valide');
      return;
    }
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
      alert('Veuillez entrer une adresse e-mail valide et un mot de passe de 6 caractères minimum');
    });
    console.log('Compte créé');
  }

  return (
    <div className="container">
      <h1 className="app-title">Hofman Chat</h1>
      
      <div className="provider-buttons">
        <button className="provider-btn" onClick={handleSignInWithGoogle}>
          <FcGoogle className="google-btn-logo"/>
          Se connecter avec Google
        </button>
      </div>
      
      <div className="auth-fields-and-buttons">
        {/* <input type="text" placeholder="Ton Nom" value={displayName} onChange={e => setDisplayName(e.target.value)}/> */}
        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button className="primary-btn" onClick={handleSignIn}>Connecter</button>
        <button className="secondary-btn" onClick={newAccount}>Créer un compte</button>
      </div>
    </div>
  );
};

export default LoginPage;