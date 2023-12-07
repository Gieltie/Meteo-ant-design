// LoginPage.js
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = ({ handleSignInWithGoogle, handleSignIn, newAccount, email, setEmail, password, setPassword }) => {
  return (
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
  );
};

export default LoginPage;