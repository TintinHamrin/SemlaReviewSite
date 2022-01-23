import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import '../pages/About';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

function Navbar() {
  // const [value, setValue] = useState(1);

  // const handleChange = (event: any, value: number) => {
  //   setValue(value);
  //   console.log('changin tab');
  // };
  // value={value} onChange={handleChange}

  return (
    // <div className="navbar">
    //   <Link className="navbar-link" to="/">
    //     Home
    //   </Link>
    //   <Link className="navbar-link" to="map">
    //     Map
    //   </Link>
    //   <Link className="navbar-link" to="About">
    //     About
    //   </Link>
    //   <Link className="navbar-link" to="Reviews">
    //     Reviews
    //   </Link>
    // </div>
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
