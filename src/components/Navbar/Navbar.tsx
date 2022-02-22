import React, { useContext, useState } from 'react';
import './Navbar.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LoginDialog from '../Login/LoginDialog';
import AvatarInNavbar from '../AvatarInNavbar/AvatarInNavbar';
import { AuthContext } from '../../state/AuthContextProvider';

function Navbar(props: any) {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState(0);

  const handleChange = (event: any, value: any) => {
    setState(value as number);
  };

  return (
    <React.Fragment>
      <Tabs
        centered
        value={state}
        onChange={handleChange}
        indicatorColor={'secondary'}
      >
        <Tab label="Startsida" to="/" component={Link} />
        <Tab label="Recensioner" to="reviews" component={Link} />
        <Tab label="SemmelKarta" to="map" component={Link} />
        {authContext.userLoggedIn && (
          <Tab label="Skriv en recension" to="form" component={Link} />
        )}
        {!authContext.userLoggedIn && <LoginDialog />}
        {authContext.userLoggedIn && <AvatarInNavbar />}
      </Tabs>
    </React.Fragment>
  );
}

export default Navbar;
