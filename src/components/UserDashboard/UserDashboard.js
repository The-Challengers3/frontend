import React from 'react';
import "./dashboard.css";
import Reelspage from '../reels/reelsPage';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
const socket = io("http://localhost:3005");


function UserDashboard({user}) {
  const sendToAdmin=()=>{
    socket.emit("sendNotification", {
      senderName: user.username,
      receiverName: "laith"||"ala",
    });
  }
    return (
    <div>
      <span>
        Welcome to the user dashboard <b>{user.user.username}</b>.
        <Link to="/Reels">
          <button>add reel</button>
        </Link>
        <Link to="/Chat">
          <button onClick={sendToAdmin}>help center</button>
        </Link>
      </span>
    </div>
  );
}

export default UserDashboard;