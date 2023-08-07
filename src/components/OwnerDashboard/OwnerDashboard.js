import "./OWdashboard.css";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import axios from "axios";
import { useState } from "react";
import RestModal from "./restModal/modal";

function OwnerDashboard({ user, socket }) {
  const [rest, setRest] = useState([]);
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

  const getRest = async () => {
    // try {
    //   const res = await axios.get(
    //     `${process.env.REACT_APP_SERVER_URL}getRest/${user.user.id}`,

    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    //         // 'Content-Type': 'application/json',
    //       },
    //     }
    //   );
    //   setRest(res.data.restaurants);
    //   console.log(res.data.restaurants);

    // } catch (err) {
    //   console.log(err);
    // }
  };
  useEffect(() => {
    getRest();
  }, []);
  return (
    <section className="ownerDash">
      <div className="owneer">
        <span className="dashTitle">
          Welcome to the owner dashboard <b>{user.user.username.toUpperCase()}</b>
        </span>
        {/* <RestModal user={user} /> */}
        <Link to="/map">
          <button>Add rest</button>
        </Link>
        <div className="notifications">
          {
            notifications.map((n) => {
              console.log(n)
              return (
                <p>{n.senderName} made a reservation in your restaurant {n.roomId}</p>
              )
            })
          }
        </div>
        <section className="restss">
          {rest?.map((restItem) => (
            <section className="rest">
              <h1>
                <strong>{restItem.name}</strong>
              </h1>
              <p>{restItem.descreption}</p>
              <p>{restItem.location}</p>
              <p>{restItem.price}</p>
            </section>
          ))}
        </section>
      </div>
    </section>
  );
}

export default OwnerDashboard;
