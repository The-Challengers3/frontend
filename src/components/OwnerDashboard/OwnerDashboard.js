import "./OWdashboard.css";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import axios from "axios";
import { useState } from "react";
import RestModal from "./restModal/modal";

function OwnerDashboard({ user }) {
  const [rest, setRest] = useState([]);

  const getRest = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/getRest/${user.user.id}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            // 'Content-Type': 'application/json',
          },
        }
      );
      setRest(res.data.restaurants);
      console.log(res.data.restaurants);

    } catch (err) {
      console.log(err);
    }
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

        {/* {
          rest?.map((rest)=>{
            return(<>
            <section className="rest">
              <h1><strong>{rest?.name}</strong></h1>
            <p>{rest.descreption}</p>
            <p>{rest.location}</p>
            <p>{rest.price}</p>
              
            </section>
            </>)
          })
        } */}
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
