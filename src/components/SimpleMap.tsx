import React from "react";
import GoogleMapReact from "google-map-react";

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 59.32835602,
      lng: 18.0602627,
    },
    zoom: 13,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "60vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDeIVzzBnnMgfb72OOVYd8v5sdvF_wmIPg" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </div>
  );
}
