// src/components/Home.js
import React from 'react';
import '../css/Home.css'; // Import external CSS file

function Home({ user, logout }) {
  return (
    <div className="home-container">
      <div className="welcome-container">
        <h2 className="welcome-message">Welcome {user.firstName} {user.lastName}</h2>
      </div>
      <div className="logout-container">
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
