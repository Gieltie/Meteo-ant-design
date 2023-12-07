import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import defaultImage from '../assets/default-profile-picture.jpeg';

const Home = ({ handleSignOut, user }) => {
  return (
    <div className="container">
      <nav>
        <LuLogOut onClick={handleSignOut}/>
      </nav>
      <div className="app-container">
        <div className="user-section">
          <img src={user.photoURL || defaultImage} id="user-profile-picture" />
          <h2>Welcome, {user.displayName || "Friend"} <br />you are logged in!</h2>

          <input id="display-name-input" type="text" placeholder="Display Name" />
          <input id="photo-url-input" type="text" placeholder="Profile Photo URL" />
          <button id="update-profile-btn" class="primary-btn">Update profile</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
