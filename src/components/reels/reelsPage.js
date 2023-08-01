import { useEffect, useState } from "react";
import "./reel.css";

import axios from 'axios';


import Reel from "./reel";
import ReelModal from './reelModal/modal'


const App = () => {
  const [reelsData, setreelsData] = useState([]);
  
  
  const req = async()=>{
    const req = `http://localhost:3005/reels`;
    const res = await axios.get(req)
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
          <div className="logo">
            
          </div>
          <ReelModal/>
          <h3>Reel</h3>
      
          {/*  */}

          <div className="video-container" id="video-container">
            {/*  */}

            {reelsData.map((list, i) => (
              <Reel key={i} url={list.url} />
            ))}

            {/*  */}
          </div>
        </center>
      </div>
    </>
  );
};

export default App;
