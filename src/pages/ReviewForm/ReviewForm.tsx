import React, { ChangeEvent, useReducer, useRef, useState } from 'react';
import './ReviewForm.scss'; //interesting that it takes styles from About.scss even though not imported? understanding why modules are good..
import { auth } from '../../firebaseConfig';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import { PlacesAutocomplete } from '../../components/review-form/PlacesAutocomplete';
import { Review } from '../../models/review';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { bakeryActions } from '../../store/bakery-slice';
import { RootState } from '../../store';

function reviewReducer(state: Review, newState: Review) {
  return newState;
}

function ReviewForm(props: any) {
  const [review, reviewDispatch] = useReducer(reviewReducer, new Review());
  const reviewRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File>();
  const [reviewId, setReviewId] = useState<string>(Math.random().toString());
  const dispatch = useDispatch();
  const bakeryNameAlreadyKnown = useSelector(
    (state: RootState) => state.auth.bakeryNameAlreadyKnown
  );
  const reviews = useSelector(
    (state: RootState) => state.bakery.reviews
  ) as Review[];

  const collectingRefs = async () => {
    //change to better name of function
    review.score = parseInt(scoreRef.current!.value);
    review.review = reviewRef.current!.value;
    review.userId = auth.currentUser!.uid;
    await review.save();
  };

  const SubmitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await review.uploadImage(photo);
    await collectingRefs();
    reviewRef.current!.value = '';
    scoreRef.current!.value = '';
    await review.fetchDownloadUrl();
    dispatch(bakeryActions.loadReviews([review, ...reviews]));
    dispatch(authActions.setShowLoginForm(false));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhoto = e.target.files![0]!;
    setPhoto(newPhoto);
  };

  return (
    <div className="form-wrapper">
      <Box
        className="box"
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        {bakeryNameAlreadyKnown || (
          <PlacesAutocomplete reviewDispatch={reviewDispatch} />
        )}
        {bakeryNameAlreadyKnown && (
          <TextField
            id="filled-multiline-flexible"
            label="review"
            // placeholder="Skriv din recension här"
            multiline
            variant="filled"
            // inputRef={reviewRef}
            // add name of bakery prefilled
          />
        )}

        <TextField
          id="outlined-textarea"
          label="score"
          placeholder="Poäng på semla"
          multiline
          variant="filled"
          inputRef={scoreRef}
        />
        <TextField
          id="filled-multiline-flexible"
          label="review"
          placeholder="Skriv din recension här"
          multiline
          variant="filled"
          inputRef={reviewRef}
        />
        <div className="photo-input">
          <input type="file" onChange={handleChange} />
        </div>
      </Box>
      <Button
        className="send-button"
        variant="contained"
        onClick={SubmitHandler}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </div>
  );
}

export default ReviewForm;
