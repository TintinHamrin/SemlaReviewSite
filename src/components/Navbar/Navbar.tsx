import React, { useState } from 'react';
import './Navbar.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../../pages/About/About';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';

function Navbar() {
  const [state, setState] = useState(0);

  let handleChange = (event: any, value: any) => {
    setState(value as number);
  };

  return (
    <Tabs
      centered
      value={state}
      onChange={handleChange}
      indicatorColor={'secondary'}
    >
      <Tab label="Startsida" to="/" component={Link} />
      <Tab label="Recensioner" to="reviews" component={Link} />
      <Tab label="SemmelKarta" to="map" component={Link} />
      <Tab label="Om" to="about" component={Link} />
    </Tabs>
  );
}

export default Navbar;
