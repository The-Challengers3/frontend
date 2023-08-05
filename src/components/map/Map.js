import * as React from "react";
import { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
// import "./map.css";

import Map, {
  NavigationControl,
  Layer,
  Source,
  GeolocateControl,
  Marker,
  Popup,
} from "react-map-gl";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});
var zzz = []
function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
  console.log(position);
  zzz.push(position.coords.longitude);
  zzz.push(position.coords.latitude);
}

function errorLocation() {
  setupMap([31.9539, 35.9106]);
}

function setupMap(center) {
  return center
}

function MApp() {
  const [showPopup, setShowPopup] = useState(true);
  const [pins, setPins] = useState([]);

  const [initialViewState, setInitialViewState] = useState({
    longitude: 35.9106,
    latitude: 31.9539,
    zoom: 8.5,
  });

  const [start, setStart] = useState(zzz);
  const [newPlace, setNewPlace] = useState(null);

  const [end, setEnd] = useState([zzz]);
  const [coords, setCoords] = useState([])

  useEffect(() => {
    getRoute()
  }, [end, start])

  const getRoute = async () => {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYW1yb2Jhbmlpc3NhIiwiYSI6ImNsa3RtZXZ6aTBheG8zZnFvZXA2NmJ1dmoifQ.niUJad6HoR8yfURjiAS5Dw`
    );
    const data = await response.json();
    console.log(data)
    const coords = data.routes[0].geometry.coordinates
    setCoords(coords)
  }
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "LineString",
          coordinates: [
            ...coords
          ],
        },
      },
    ],
  };

  const lineStyle = {
    id: "roadLayer",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "blue",
      "line-width": 4,
      "line-opacity": 0.75,
    },
  };

  const geoControlRef = useRef();

  useEffect(() => {
    if (geoControlRef.current) {
      geoControlRef.current.trigger();
    }
  }, [geoControlRef.current]);

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

    const handleClick= (e)=>{
      const newEnd = e.lngLat
      const endPoint= Object.keys(newEnd).map((item,i)=>newEnd[item])
      setEnd(endPoint)
    }
const addNewPlace=(e)=>{
 // const[long,lat]=e.lngLat;
  console.log(e);
//  setNewPlace({
//     lat,
//     long,
//   })
}
  return (
    <>
      {coords&&(<Map
        {...initialViewState}
        onClick={handleClick}
        onMove={evt => setInitialViewState(evt.initialViewState)}
        mapboxAccessToken="pk.eyJ1IjoiYW1yb2Jhbmlpc3NhIiwiYSI6ImNsa3RtZXZ6aTBheG8zZnFvZXA2NmJ1dmoifQ.niUJad6HoR8yfURjiAS5Dw"
        // initialViewState={{
        //   center: setupMap(),
        //   longitude: 36.2384,
        //   latitude: 30.5852,
        //   zoom: 6.5,
        // }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={addNewPlace}
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

        <Marker longitude={35.4444} latitude={30.3285} anchor="bottom">
          <RoomIcon
            style={{
              fontSize: 7 * 6,
              color: "orange",
              cursor: "pointer",
            }}
          />
        </Marker>

        <Marker longitude={35.4732} latitude={31.559} anchor="bottom">
          <RoomIcon
            style={{
              fontSize: 7 * 6,
              color: "blue",
              cursor: "pointer",
            }}
          />
        </Marker>

        <Marker longitude={35.5874} latitude={31.7219} anchor="bottom">
          <RoomIcon
            style={{
              fontSize: 7 * 6,
              color: "green",
              cursor: "pointer",
            }}
          />
        </Marker>

        {showPopup && (
          <Popup
            longitude={35.9106}
            latitude={31.9539}
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
          </Popup>
        )}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <NavigationControl />
        </div>
        <GeolocateControl ref={geoControlRef} />
        <Source id="routeSource" type="geojson" data={geojson}>
          <Layer {...lineStyle} />
        </Source>
        {/* {newPlace&&(<Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              hello
              </Popup>)} */}
      </Map>)}
    </>
  );
}
export default MApp;
