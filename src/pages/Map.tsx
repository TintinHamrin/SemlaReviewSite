import React from "react";
import "./Map.scss";
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

// function Map() {
//   // const [isLoaded, loadError] = useLoadScript({
//   //   googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
//   //   libraries,
//   // });

//   // if (loadError) console.log('error loading maps');
//   // if (!isLoaded) console.log('loading maps');

//   return <div className="map-container">Map</div>;
// }

// export default Map;

import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
//import Rating from '@material-ui/lab/Rating';
//import useStyles from './styles';
//import {Coordinates, Bounds, Place} from '../../interfaces';
import { makeStyles } from "@material-ui/core/styles";

declare module "react" {
  interface HTMLAttributes<T> {
    lat?: number;
    lng?: number;
  }
}

// https://github.com/ab316/web-dev-learning/blob/1e30457521195f5bec203040d488126043e4d4a5/frontend/react/3-travel-advisor/src/components/Map/styles.ts
// https://github.com/wellyshen/use-places-autocomplete
const useStyles = makeStyles(() => ({
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
  },
  mapContainer: {
    height: "80vh",
    margin: "50px",
    display: "flex",
  },
  markerContainer: {
    //position: "absolute",
    // transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  pointer: {
    cursor: "pointer",
  },
}));

// interface MapProps {
//   setCoordinates: React.Dispatch<React.SetStateAction<Coordinates | undefined>>;
//   setBounds: React.Dispatch<React.SetStateAction<Bounds | undefined>>;
//   // coordinates: Coordinates | undefined;
//   // places: Place[];
// }

//const Map = (props: MapProps) => {
const Map = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  // console.log("Rendering map with coords", props.coordinates);
  // console.log();

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        // Don't commit this key
        bootstrapURLKeys={{
          key:
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY ??
            "AIzaSyDeIVzzBnnMgfb72OOVYd8v5sdvF_wmIPg",
        }}
        // bootstrapURLKeys={{key: 'YOUR GOOGLE MAPS API KEY'}}
        defaultCenter={{ lat: 59.334591, lng: 18.06 }}
        //center={props.coordinates}
        margin={[50, 50, 50, 50]}
        options={{}}
        // onChange={(e) => {
        //   props.setCoordinates({ lat: e.center.lat, lng: e.center.lng });
        //   props.setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        // }}
        onChildClick={(child) => {
          console.log(child);
        }}
        defaultZoom={14}
      >
        {/* {props.places.map((place, i) => (
          <div
            key={i}
            lat={place.latitude}
            lng={place.longitude}
            className={classes.markerContainer}>
            {isDesktop ? (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.small.url
                      : 'https://www.clipartmax.com/png/full/213-2131416_restaurant-lamb-clipart-placeholder-image-for-restaurant.png'
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            ) : (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            )}
          </div>
        ))} */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
