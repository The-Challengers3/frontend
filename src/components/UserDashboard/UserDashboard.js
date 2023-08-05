import React from 'react';
import "./dashboard.css";
import Reelspage from '../reels/reelsPage';
import { Link } from 'react-router-dom';


function UserDashboard({user, socket}) {
  const sendToAdmin=()=>{
    socket.emit("sendNotification", {
      senderName: user.username,
      receiverName: "laith"||"ala",
    });
  }
    return (
      <section className='userDash'>
    <div className='userr'>
      <span className='dashTitle'>
        Welcome to the user dashboard <b>{user.user.username}</b>
      </span> <Link to="/Reels">
          <button className='userBut'>add reel</button>
        </Link>
        <Link to="/Chat">
          <button className='userBut' onClick={sendToAdmin}>help center</button>
        </Link>
    </div></section>
  );
}

export default UserDashboard;