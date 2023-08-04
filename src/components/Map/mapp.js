import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import img from './pin (1).png';

function MApp() {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiYW1yb2Jhbmlpc3NhIiwiYSI6ImNsa3RtZXZ6aTBheG8zZnFvZXA2NmJ1dmoifQ.niUJad6HoR8yfURjiAS5Dw"
      initialViewState={{
        longitude: 36.2384,
        latitude: 30.5852,
        zoom: 6.5
      }}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
          <Marker longitude={35.9106} latitude={31.9539} anchor="bottom" >
      <img src={img} />
    </Marker>

    </Map>
  );
}
export default MApp;