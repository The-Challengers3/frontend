import "./OWdashboard.css";
import React from "react";
import axios from "axios";
import { useState } from "react";

function OwnerDashboard({ user }) {
  const [rest, setRest] = useState(null);
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
    </div>
  );
}

export default OwnerDashboard;
