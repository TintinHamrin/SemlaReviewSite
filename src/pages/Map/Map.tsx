import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import SimpleMap from "../../components/SimpleMap";
import { MapModel } from "../../models/mapmodel";
import "./Map.scss";

const Map = () => {
  //const map = new MapModel();
  return (
    <div className="map-page-wrapper">
      <div className="welcome-card-wrapper">
        <Card className="welcome-card" sx={{ width: "80%" }}>
          <CardContent>
            <Typography component="div" variant="h5">
              Work in progress!
            </Typography>
            <Typography variant="body1">
              This page will have a map of all semla places soon!
            </Typography>
          </CardContent>
        </Card>
      </div>
      <SimpleMap></SimpleMap>
      
    
    </div>
  );
};

export default Map;
