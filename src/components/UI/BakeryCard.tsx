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
import { useParams } from 'react-router-dom';
import { bakeryActions } from '../../store/bakery-slice';
import { Bakery } from '../../models/bakery';

export default function BakeryCard() {
  const { id, name } = useParams();
  const bakery = new Bakery(id!, name!);
  const puss = 'puss';
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.bakery.reviews);
  const [counter, setCounter] = useState();

  useEffect(() => {
    console.log('useffect');
    bakery
      .reviews()
      .then(async (reviews) => dispatch(bakeryActions.loadReviews(reviews)))
      .catch((error) => console.error(error));
  }, []);

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
    fetch(`/bakery-visits-count/${bakery.placeId}`)
      .then((response) => response.json())
      .then((data) => setCounter(data[bakery.placeId]))
      .catch((e) => console.error(e));
  }, []);

  // todo: fetch the reviews w the same place id, map over them adding the score into a variable

  return (
    <div>
      <Card className="CardContainer">
        <CardContent>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            {bakery.name}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            Antal reviews för {bakery.name}:
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            Genomsnittsscore för {bakery.name}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            Antal sidvisningar: {counter}
          </Typography>
        </CardContent>
        <CardContent>
          <Button variant="outlined" onClick={openLoginFormHandler}>
            Skriv en recension om {bakery.name}
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
        {bakery.placeId}

        {reviews.map((review) => (
          <CardContent>
            <ReviewCard review={review} />
          </CardContent>
        ))}
      </Card>
    </div>
  );
}
