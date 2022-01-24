import React, { useState } from "react";
import "./Navbar.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../pages/About";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";

function Navbar() {
  // const { match } = props;
  // const { params } = match;
  // const { page } = params;

  // const tabNameToIndex = {
  //   0: 'home',
  //   1: 'reviews',
  //   2: 'map',
  //   3: 'about`',
  // };
  // const indexToTabName = {
  //   home: 0,
  //   reviews: 1,
  //   map: 2,
  //   about: 3,
  // };

  // const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);

  // const handleChange = (
  //   event: React.SyntheticEvent<Element, Event>,
  //   tab:any
  // ) => {
  //   setSelectedTab(tab);
  // };

  const [state, setState] = useState(0);

  let handleChange = (event: any, value: any) => {
    setState(value as number);
  };

  return (
    <Tabs
      centered
      value={state}
      onChange={handleChange}
      indicatorColor={"secondary"}
    >
      <Tab label="Startsida" to="/" component={Link} />
      <Tab label="Recensioner" to="reviews" component={Link} />
      <Tab label="SemmelKarta" to="map" component={Link} />
      <Tab label="Om" to="about" component={Link} />
    </Tabs>
  );
}

export default Navbar;
