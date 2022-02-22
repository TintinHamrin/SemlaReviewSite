import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import {
  Box,
  Card,
  CardContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function LoginDialog(props: any) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      handleClose();
      //props.setUserLoggedIn(true);
      console.log('login');
    } catch (error) {
      alert(error);
    }
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      handleClose();
      //props.setUserLoggedIn(true);
      console.log('reg');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Logga in</Button>

      <Dialog open={openDialog} onClose={handleClose}>
        <Card variant="outlined">
          <CardContent>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Logga in" />
              <Tab label="Registrera dig" />
            </Tabs>
            {/* <DialogActions>
          <LoginForm
            setUserLoggedIn={props.setUserLoggedIn}
            handleDialogOnClose={handleClose}
          />
          <RegisterForm
            setUserLoggedIn={props.setUserLoggedIn}
            handleDialogOnClose={handleClose}
          />
        </DialogActions> */}

            {/* <DialogTitle>Logga in</DialogTitle> */}
            <TextField
              autoFocus
              margin="dense"
              id="logname"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              inputRef={emailRef}
            />
            <TextField
              autoFocus
              margin="dense"
              id="logpassword"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              inputRef={passwordRef}
            />
          </CardContent>
        </Card>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {tabValue === 0 && <Button onClick={login}>Logga in</Button>}
          {tabValue === 1 && <Button onClick={register}>Registrera dig</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
