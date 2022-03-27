import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Card, CardContent, Typography } from "@mui/material";
import "./FirstPage.scss";

export default function SimplePaper() {
  return (
    <div className="welcome-card-wrapper">
      <Card className="welcome-card"  sx={{ width: "80%" }}>
        <CardContent>
          <Typography component="div" variant="h5">
            Welcome To Semla Heaven!
          </Typography>
          <Typography variant="body1">
            This place is for everyone who loves semlor. Here you are invited to
            write and read reviews for semlor all around the world. Anyone can
            read but to write we invite you to become a registered member. 
          </Typography>
          <Typography variant="h6">
            See
            you in the Semla haze!
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
