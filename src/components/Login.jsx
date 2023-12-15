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
      alert('Connecter avec Google');
    }).catch((error) => {
      console.log(error.message) ;
    });
  }
  
  const handleSignIn = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Entrez une adresse e-mail valide');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert(`Connecté en tant que ${user.email}`);
      setEmail('');
      setPassword('');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Erreur: ${errorCode} ${errorMessage}`);
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
      alert('Entrez une adresse e-mail valide avec un mot de passe de 6 caractères minimum');
    });
    alert('Compte créé');
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
        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button className="primary-btn" onClick={handleSignIn}>Connecter</button>
        <button className="secondary-btn" onClick={newAccount}>Créer un compte</button>
      </div>
    </div>
  );
};

export default LoginPage;