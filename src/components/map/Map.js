
import * as React from "react";
import { useState, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import "./map.css";
function MApp() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: "nour",
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("http://localhost:3005/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

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
    <section className="map">
    <Map
      mapboxAccessToken="pk.eyJ1IjoiYW1yb2Jhbmlpc3NhIiwiYSI6ImNsa3RtZXZ6aTBheG8zZnFvZXA2NmJ1dmoifQ.niUJad6HoR8yfURjiAS5Dw"
      initialViewState={{
        longitude: 36.2384,
        latitude: 30.5852,
        zoom: 7,
        bearing: 0,
        pitch: 0
      }}
      style={{ width: 1500, height: 700 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      
    >

<GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />


        {pins.map((p) => (
          <>
       
      <Marker onClick={(e)=>{setShowPopup(true)}}  longitude={p.long} latitude={p.lat} anchor="bottom"  >
        <RoomIcon
        
          style={{
            fontSize: 7 * 6,
            color: "tomato",
            cursor: "pointer",
          }}
        
          onClick={e => {
            setPopupInfo(p);
            setShowPopup(true);
            console.log(popupInfo);
          }}
        
        />
      </Marker></>))}
      {showPopup && (
      <Popup
      longitude={popupInfo.long}
       latitude={popupInfo.lat}
      anchor="left"
      closeButton={true}
      closeOnClick={false}
      onClose={() => setShowPopup(false)}
      // onOpen={()=>{
      //   setShowPopup(true)
      // }}
        >
        <div className="card">
                  <label>Place</label>
                  <h4 className="place">{popupInfo.title}</h4>
                  <label>Review</label>
                  <p className="desc">{popupInfo.desc}</p>
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
      {/* {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * 4}
              offsetTop={-7 * 4}
            >
              <RoomIcon
                style={{
                  fontSize: 7 * 4,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )} */}
    </Map></section>
  );
}
export default MApp;
