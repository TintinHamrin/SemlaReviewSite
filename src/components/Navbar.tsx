import React, { useState } from 'react';
import './Navbar.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../pages/About';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';

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

  return (
    <Tabs centered>
      <Link to="/">
        <Tab label="Startsida" />
      </Link>
      <Link to="Reviews">
        <Tab label="Recensioner" />
      </Link>
      <Link to="map">
        <Tab label="SemmelKarta" />
      </Link>
      <Link to="About">
        <Tab label="Om" />
      </Link>
    </Tabs>
  );
}

export default Navbar;
