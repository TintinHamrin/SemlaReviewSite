import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import AuthContextProvider from './state/AuthContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
