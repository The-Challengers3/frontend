import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import Reelspage from '../reels/reelsPage';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
const socket = io("http://localhost:3005");


function UserDashboard({ user, socket }) {

  socket?.emit("newUser", user.user.username);

  const adminArray = ['laith', 'mary'];

  const sendToAdmin = () => {
    socket?.emit("join_room", `${user?.user?.id}`);

    adminArray.map((name) => {
      socket?.emit("sendNotification", {
        senderName: user?.user?.username,
        receiverName: name,
        roomId: user?.user?.id
      });
    });


    // console.log(user.user.username)
    // console.log(user.user.id)
  }

  const notifyBooking = () => {
    socket.emit("sendNotification", {
      senderName: user.user.username,
      receiverName: 'ala'
    });
  }


  // useEffect(() => {
  //   setUserRoom(user?.user?.id)
  // }, [user?.user?.id]);


  return (
    <div>
      <span>
        Welcome to the user dashboard <b>{user.user.username}</b>.
        <Link to="/Reels">
          <button>add reel</button>
        </Link>
        <Link to="/Room">
          <button onClick={sendToAdmin}>help center</button>
        </Link>
        <button onClick={notifyBooking}>book here</button>
      </span>
    </div>
  );
}

export default UserDashboard;