
import * as React from "react";
import { useState } from "react";
import Map, { Marker,Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import "./map.css";
function MApp() {
  const [showPopup, setShowPopup] = useState(true);
  const [pins, setPins] = useState([]);


  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("http://localhost:3005/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
     getPins();
  }, []);

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiYW1yb2Jhbmlpc3NhIiwiYSI6ImNsa3RtZXZ6aTBheG8zZnFvZXA2NmJ1dmoifQ.niUJad6HoR8yfURjiAS5Dw"
      initialViewState={{
        longitude: 36.2384,
        latitude: 30.5852,
        zoom: 6.5,
      }}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={35.9106} latitude={31.9539} anchor="bottom">
        <RoomIcon
          style={{
            fontSize: 7 * 6,
            color: "tomato",
            cursor: "pointer",
          }}
        />
      </Marker>
      {showPopup && (
      <Popup longitude={35.9106} latitude={31.9539}
        anchor="left"
        // onClose={() => setShowPopup(false)}
        >
        <div className="card">
                  <label>Place</label>
                  <h4 className="place">amman</h4>
                  <label>Review</label>
                  <p className="desc">welcom to amman</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(5).fill(<StarIcon className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>amro</b>
                  </span>
                  
                </div>
      </Popup>)}
    </Map>
  );
}
export default MApp;
