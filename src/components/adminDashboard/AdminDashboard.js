import "./admindashboard.css";
import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

function AdminDashboard({ user, socket }) {
  const [notifications, setNotifications] = useState([]);

  localStorage.setItem('userToken', user.token);

  socket?.emit("newUser", user.user.username);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
    // console.log(notifications)
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("getNotification");
    };
  }, [socket]);

  return (
    <div>
      <span>
        Welcome to the admin dashboard <b>{user.user.username}</b>.
        <Link to="/Room">
          <button >help center</button>
        </Link>
        <div className="notifications">
          {
            notifications.map((n) => {
              console.log(n)
              return (
                <p>{n.senderName} joined room {n.roomId}</p>
              )
            })
          }
        </div>
      </span>
    </div>
  );
}

export default AdminDashboard;
