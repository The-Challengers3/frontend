import React from 'react';
import "./dashboard.css";
import Reelspage from '../reels/reelsPage';
import { Link } from 'react-router-dom';


function UserDashboard({user}) {
    return (
    <div>
      <span>
        Welcome to the user dashboard <b>{user.user.username}</b>.
        <Link to="/Reels">
          <button>add reel</button>
        </Link>
      </span>
    </div>
  );
}

export default UserDashboard;