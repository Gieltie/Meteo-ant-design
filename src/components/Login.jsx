import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = ({ handleSignInWithGoogle, handleSignIn, newAccountPage, email, setEmail, password, setPassword }) => {
  return (
    <div className="container">
      <h1 className="app-title">Hofman Login</h1>
      
      <div className="provider-buttons">
        <button className="provider-btn" onClick={handleSignInWithGoogle}>
          <FcGoogle className="google-btn-logo"/>
          Se connecter avec Google
        </button>
      </div>
      
      <div className="auth-fields-and-buttons">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button className="primary-btn" onClick={handleSignIn}>Connecter</button>
        <button className="secondary-btn" onClick={newAccountPage}>Créer un compte</button>
      </div>
    </div>
  );
};

export default LoginPage;