import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { auth } from '../firebaseConfig';

export const AuthContext = React.createContext({
  userLoggedIn: false,
});

export function AuthContextProvider(props: any) {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  onAuthStateChanged(auth, (user) => {
    setUserLoggedIn(!!user);
  });

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
