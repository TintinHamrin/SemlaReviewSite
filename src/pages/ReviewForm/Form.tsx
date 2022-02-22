import React, { ChangeEvent, useReducer, useRef, useState } from 'react';
import { ReviewProps } from '../../App';
import './Form.scss'; //interesting that it takes styles from About.scss even though not imported? understanding why modules are good..
import { doc, getDoc, addDoc, setDoc, collection } from 'firebase/firestore';
import { auth, db, reviewRef } from '../../firebaseConfig';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { PlacesAutocomplete } from '../../components/review-form/PlacesAutocomplete';
import { Review } from '../../models/review';

function reviewReducer(state: Review, newState: Review) {
  return newState;
}

function Form(props: any) {
  const [review, reviewDispatch] = useReducer(reviewReducer, new Review());
  const reviewRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File>();
  const [reviewId, setReviewId] = useState<string>(Math.random().toString());

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
        <PlacesAutocomplete reviewDispatch={reviewDispatch} />

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

export default Form;
