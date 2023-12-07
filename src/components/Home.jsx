import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import defaultImage from '../assets/default-profile-picture.jpeg';

const Home = ({ handleSignOut, authUpdateProfile, user, updatedName, setUpdatedName, updatedPhoto, setUpdatedPhoto }) => {
  return (
    <div className="container">
      <nav>
        <LuLogOut onClick={handleSignOut}/>
      </nav>
      <div className="app-container">
        <div className="user-section">
          <img src={user.photoURL || defaultImage} id="user-profile-picture" />
          <h2>Salut {user.displayName || "l'ami,"} <br />Vous êtes connecté!</h2>

          <input type="text" placeholder="Nom de Profile" value={updatedName} onChange={e => setUpdatedName(e.target.value)}/>
          <input type="text" placeholder="Url de Photo de Profile" value={updatedPhoto} onChange={e => setUpdatedPhoto(e.target.value)}/>
          <button className="primary-btn" onClick={authUpdateProfile}>Mettre à jour le profil</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
