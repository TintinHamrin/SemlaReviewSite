import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ContactsRounded } from '@material-ui/icons';
import { auth } from '../../firebaseConfig';

export function Login(props: any) {
  props.setUserLoggedIn(false);
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  //   const registerEmail = useRef<HTMLInputElement>(null);
  //   const registerPassword = useRef<HTMLInputElement>(null);
  //   const loginEmail = useRef<HTMLInputElement | null>(null);
  //   const loginPassword = useRef<HTMLInputElement | null>(null);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      props.setUserLoggedIn(true);
      console.log(user);
    } catch (error) {
      alert(error);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      props.setUserLoggedIn(true);
      console.log(user);
    } catch (error) {
      alert(error);
    }
  };

  const logout = async () => {};

  //   const registerHandler = (event: any) => {
  //     event.preventDefault();
  //     console.log(registerEmail.current!.value, registerPassword.current!.value);
  //   };
  //   const loginHandler = (event: any) => {
  //     event.preventDefault();
  //     console.log(loginEmail.current!.value, loginPassword.current!.value);
  //   };

  return (
    <div className="login-wrapper">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Registrera dig</h1>
        <div>
          <TextField
            //   error
            id="filled-error"
            //   label="Error"
            defaultValue="mail-adress"
            variant="filled"
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
            // inputRef={registerEmail}
          />
          <TextField
            //   error
            id="filled-error-helper-text"
            //   label="Error"
            defaultValue="Losenord"
            //   helperText="Incorrect entry."
            variant="filled"
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
            // inputRef={registerPassword}
          />
          <Button variant="outlined" onClick={register}>
            Registrera dig
          </Button>
        </div>
        <h1>Logga in</h1>
        <div>
          <TextField
            //   error
            id="filled-error"
            //   label="Error"
            defaultValue="mail-adress"
            variant="filled"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
            // inputRef={loginEmail}
          />
          <TextField
            //   error
            id="filled-error-helper-text"
            //   label="Error"
            defaultValue="Losenord"
            //   helperText="Incorrect entry."
            variant="filled"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
            // inputRef={loginPassword}
          />
          <Button variant="outlined" onClick={login}>
            Logga in
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Login;
