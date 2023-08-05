import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from 'mapbox-gl-directions';

const MapWithDirections = () => {
  const [map, setMap] = React.useState(null);

  React.useEffect(() => {
   
	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoiYW1yb2Jhbmlpc3NhIiwiYSI6ImNsa3RtZXZ6aTBheG8zZnFvZXA2NmJ1dmoifQ.niUJad6HoR8yfURjiAS5Dw';
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13
    });

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );

  }, []);

  return (
    <div>
      <div id="map"></div>
    </div>
  );
};

export default MapWithDirections;
