import React from 'react';
import './Map.scss';
// import 'index.d.ts'
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   infoWindow,
// } from 'react-google-maps-api';

// const libraries = ['places'];

// declare module "react-google-maps" {
//   export var GoogleMap: GoogleMap;
// }

// interface GoogleMap {
//   any: any;
// }

function Map() {
  // const [isLoaded, loadError] = useLoadScript({
  //   googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  //   libraries,
  // });

  // if (loadError) console.log('error loading maps');
  // if (!isLoaded) console.log('loading maps');

  return <div className="map-container">Map</div>;
}

export default Map;
