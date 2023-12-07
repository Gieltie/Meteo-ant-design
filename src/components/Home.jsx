import React from 'react';
import { LuLogOut } from 'react-icons/lu';

const Home = ({ handleSignOut }) => {
  return (
    <div className="container">
      <nav>
        <LuLogOut onClick={handleSignOut}/>
      </nav>
      <h1>Welcome, you are logged in!</h1>
      <div className="app-container">
        <div className="user-section">
          <img id="user-profile-picture" />
        </div>
      </div>
    </div>
  );
};

export default Home;
