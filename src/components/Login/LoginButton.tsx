import { useState } from 'react';
import Button from '@mui/material/Button';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

export default function LoginDialog(props: any) {
  // const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(authActions.setShowLoginForm(true));
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Logga in</Button>
      <LoginForm />
    </>
  );
}
