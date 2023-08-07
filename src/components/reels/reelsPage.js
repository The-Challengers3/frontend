import { useEffect, useState } from "react";
import "./reel.css";

import axios from 'axios';


import Reel from "./reel";
import ReelModal from './reelModal/modal'


const Reelspage = ({user}) => {
  const [reelsData, setreelsData] = useState([]);
  
  
  const req = async()=>{
    const req = `${process.env.REACT_APP_SERVER_URL}reels`;
    const res = await axios.get(req, {
      headers: {
        "Authorization": `Bearer ${user.token}`,
      },
    });
    console.log(res.data);
    setreelsData(res.data);
  }
  useEffect(()=>{
    req();
  },[])

  return (
    <>
      <div className="App">
        <center>
          <div className="logo"></div>
          <ReelModal user ={user}/>
          <h3>Reel</h3>

          {/*  */}

          <div className="video-container" id="video-container">
            {/*  */}

            {reelsData.reverse().map((list, i) => (
              <Reel key={i} url={list.url} />
            ))}

            {/*  */}
          </div>
        </center>
      </div>
    </>
  );
};

export default Reelspage;
