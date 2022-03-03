import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebaseConfig';
import { RootState } from '../../store';
import { authActions } from '../../store/auth-slice';

function LoginForm(props: any) {
  const [tabValue, setTabValue] = React.useState(0);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const loginFormIsShowing = useSelector(
    (state: RootState) => state.auth.isShowingLoginForm
  );

  const closeLoginFormHandler = () => {
    dispatch(authActions.setShowLoginForm(false));
  };

  onAuthStateChanged(auth, (user) =>
    dispatch(authActions.setAuthenticated(!!user))
  );

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
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
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Dialog open={loginFormIsShowing}>
        <Card variant="outlined">
          <CardContent>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Logga in" />
              <Tab label="Registrera dig" />
            </Tabs>

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              inputRef={emailRef}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              inputRef={passwordRef}
            />
          </CardContent>
        </Card>
        <DialogActions>
          <Button onClick={closeLoginFormHandler}>Cancel</Button>
          {tabValue === 0 && <Button onClick={login}>Logga in</Button>}
          {tabValue === 1 && <Button onClick={register}>Registrera dig</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginForm;
