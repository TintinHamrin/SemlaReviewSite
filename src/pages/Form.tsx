import React, { useRef, useState } from 'react';
import { Review, ReviewProps } from '../App';
import './Form.scss'; //interesting that it takes styles from About.scss even though not imported? understanding why modules are good..
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db, reviewRef } from '../firebaseConfig';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { PlacesAutocomplete } from '../components/review-form/PlacesAutocomplete';

function Form(props: ReviewProps) {
  const [placeId, setPlaceId] = useState('');

  const reviewRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);

  const collectingRefs = () => {
    const review = new Review(
      reviewRef.current!.value,
      parseInt(scoreRef.current!.value)
    );
    review.placeId = placeId;

    addDoc(collection(db, 'reviews'), { ...review });

    props.revs.push(review);
    console.log(props.revs);
  };

  const SubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    collectingRefs();
    reviewRef.current!.value = '';
    scoreRef.current!.value = '';
  };

  // const { init } = usePlacesAutocomplete({
  //   initOnMount: false, // Disable initializing when the component mounts, default is true
  // });

  // const [loading] = useGoogleMapsApi({
  //   library: "places",
  //   onLoad: () => init(), // Lazily initializing the hook when the script is ready
  // });

  // export default function MultilineTextFields() {
  //   const [value, setValue] = React.useState('Controlled');

  //   const handleChange = (event) => {
  //     setValue(event.target.value);
  //   };
  //

  // <div className="main-wrapper">
  //   <h1 className="form-text">Let's talk about...Semlor!</h1>
  //   <form>
  //     <label htmlFor="bageri"></label>
  //     <input type="text" id="bageri" placeholder="Bageri" ref={nameRef} />
  //     <label htmlFor="message"></label>
  //     <input
  //       type="text"
  //       id="message"
  //       placeholder="Recension"
  //       ref={reviewRef}
  //     />
  //     <label htmlFor="score"></label>
  //     <input type="number" id="score" placeholder="Score" ref={scoreRef} />
  //     <button className="btn-submit" onClick={SubmitHandler}>
  //       Submit
  //     </button>
  //   </form>
  // </div>

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
        <PlacesAutocomplete setPlaceId={setPlaceId} />

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
