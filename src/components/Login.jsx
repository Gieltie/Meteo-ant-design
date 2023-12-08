import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = ({ handleSignInWithGoogle, handleSignIn, newAccount, email, setEmail, password, setPassword, /* displayName, setDisplayName */ }) => {
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