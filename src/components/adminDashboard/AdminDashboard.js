import "./admindashboard.css";
import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import avatar from '../../imgs/user (5).png'

function AdminDashboard({ user, socket }) {
  const [notifications, setNotifications] = useState([]);

  localStorage.setItem('userToken', user.token);

  socket?.emit("newUser", user.user.username);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  
    return () => {
      socket.off("getNotification");
    };
  }, [socket]);

  return (
    <div className="adminDash">
       <section className="ownerinfo">
        <img src={avatar}/>
      <b>{user.user.username.toUpperCase()}</b>
      </section>
      <section className="dash-desc">
      <span className="adminTitel">
        Welcome to the admin dashboard </span>
        <p>This intuitive interface empowers you to oversee user activity, monitor key metrics, and effortlessly control content and settings. Stay organized with at-a-glance insights and take swift actions to ensure a seamless user experience. </p>
      </section>
      
        <Link to="/Room">
          <button className="bttn" >help center</button>
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
    </div>
  );
}

export default AdminDashboard;
