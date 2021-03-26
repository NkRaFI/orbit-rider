import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "500px",
        latitude: 23.6850,
        longitude: 90.3563,
        zoom: 5,
      });

    return (
    <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoibmstcmFmaSIsImEiOiJja21sMDdsbzMwOXEyMndvZGJnYW1vd2diIn0.0tzDOiwkyaZRULA2i4S_rw"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
    />
    );
};

export default Map;