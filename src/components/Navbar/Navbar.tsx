import React, { useContext, useState } from 'react';
import './Navbar.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LoginButton from '../Login/LoginButton';
import AvatarInNavbar from '../AvatarInNavbar/AvatarInNavbar';
import { AuthContext } from '../../state/AuthContextProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function Navbar(props: any) {
  // const authContext = useContext(AuthContext);
  const authState = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [state, setState] = useState(0);

  const handleChange = (event: any, value: any) => {
    setState(value as number);
  };

  return (
    <React.Fragment>
      <Tabs
      className="navbar"
        centered
        value={state}
        onChange={handleChange}
        indicatorColor={'secondary'}
      >
        <Tab label="Startsida" to="/" component={Link} />
        <Tab label="Recensioner" to="reviews" component={Link} />
        <Tab label="SemmelKarta" to="map" component={Link} />
        {authState && (
          <Tab label="Skriv en recension" to="form" component={Link} />
        )}
        {!authState && <LoginButton />}
        {authState && <AvatarInNavbar />}
      </Tabs>
    </React.Fragment>
  );
}

export default Navbar;
