import "./OWdashboard.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function OwnerDashboard({ user, socket }) {
  const [rest, setRest] = useState(null);
  const [notifications, setNotifications] = useState([]);

  socket?.emit("newUser", user.user.username);

  console.log(notifications)
  const addRest = async () => {
    const postData = {
      name: "jubran",
      img: "image",
      price: "100$",
      ownerId: user.user.id,
    };
    try {
      const res = await axios.post(
        "http://localhost:3005/restaurants",
        postData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            // 'Content-Type': 'application/json',
          },
        }
      );
      setRest(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("getNotification");
    };
  }, [socket]);
  return (
    <div>
      <span>
        Welcome to the owner dashboard <b>{user.user.username}</b>.
        <button onClick={addRest}>add resturant</button>
        {rest ? (
          <div>
            <p>{rest.name}</p>
            <p>{rest.img}</p>
            <p>{rest.price}</p>
          </div>
        ) : (
          ""
        )}
      </span>
      <span>
        {notifications.map((n) => {
          console.log(n)
          return (
            <p>{n.senderName} booked a restarant</p>
          )
        })}
      </span>
    </div>
  );
}

export default OwnerDashboard;
