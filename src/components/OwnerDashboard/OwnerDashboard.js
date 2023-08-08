import "./OWdashboard.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function OwnerDashboard({ user, socket }) {
  const [rest, setRest] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [missing, setMissing] = useState([]);

  socket?.emit("get-all");
  socket?.emit("newUser", user.user.username);
  localStorage.setItem("userToken", user.token);

  useEffect(() => {
    socket.on("new-notifications-msg", (payload) => {
      setMissing((prev) => [...prev, payload.Details]);
      console.log(missing);

      console.log(`missing messeges from ${payload.Details},`);
      socket.emit("received", payload);
    });
    return () => {
      socket.off("new-notifications-msg");
    };
  }, []);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

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
    <section className='ownerDash'>
      <div className='owneer'>
        <span className='dashTitle'>
          Welcome to the owner dashboard{" "}
          <b>{user.user.username.toUpperCase()}</b>
        </span>
        <Link to='/map'>
          <button>Add rest</button>
        </Link>
        <div className='notifications'>
          {notifications.map((n) => {
            console.log(n);
            return (
              <p>
                {n.senderName} made a reservation in your restaurant {n.roomId}
              </p>
            );
          })}
          {missing.map((n) => {
            console.log(n);
            return <p> {n} has made a reservation while you are offline</p>;
          })}
        </div>
        <section className='restss'>
          {rest?.map((restItem) => (
            <section className='rest'>
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
