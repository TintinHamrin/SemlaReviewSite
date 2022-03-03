import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReviewCard from './ReviewCard';
import { Review } from '../../models/review';
import ReviewForm from '../../pages/ReviewForm/ReviewForm';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import LoginForm from '../Login/LoginForm';
import { authActions } from '../../store/auth-slice';
import { DialogTitle } from '@mui/material';
import './BakeryCard.scss';
import { withStyles } from '@material-ui/core/styles';

interface IBakeryCard {
  name: string;
  reviews: Review[];
}

export default function BakeryCard(props: IBakeryCard) {
  const [counter, setCounter] = useState();
  const dispatch = useDispatch();

  const authState = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const isShowingLoginForm = useSelector(
    (state: RootState) => state.auth.isShowingLoginForm
  );

  const openLoginFormHandler = () => {
    dispatch(authActions.setShowLoginForm(true));
  };

  const closeLoginFormHandler = () => {
    dispatch(authActions.setShowLoginForm(false));
  };

  useEffect(() => {
    fetch('/bakery-visits-count')
      .then((response) => response.json())
      .then((data) => setCounter(data))
      .catch((e) => console.error(e));
  }, []);

  // todo: fetch the reviews w the same place id, map over them adding the score into a variable

  return (
    <div>
      <Card className="CardContainer">
        <CardContent>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            {props.name}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            Antal reviews för {props.name}:
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            Genomsnittsscore för {props.name}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            Antal sidvisningar: {counter}
          </Typography>
        </CardContent>
        <CardContent>
          <Button variant="outlined" onClick={openLoginFormHandler}>
            Skriv en recension om {props.name}
          </Button>
          <Dialog open={isShowingLoginForm} onClose={closeLoginFormHandler}>
            <DialogContent>
              <Card>
                <CardContent>
                  {authState && (
                    <>
                      <DialogTitle>Skriv en recension!</DialogTitle>
                      <ReviewForm />
                    </>
                  )}
                  {!authState && <LoginForm />}
                </CardContent>
              </Card>
            </DialogContent>
          </Dialog>
        </CardContent>

        {props.reviews.map((review) => (
          <CardContent>
            <ReviewCard review={review} />
          </CardContent>
        ))}
      </Card>
    </div>
  );
}
