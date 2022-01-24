import React, { useRef, useState } from "react";
import { Review, ReviewProps } from "../App";
import "./Form.scss"; //interesting that it takes styles from About.scss even though not imported? understanding why modules are good..
import { doc, getDoc, addDoc, setDoc, collection } from "firebase/firestore";
import { db, reviewRef } from "../firebaseConfig";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@material-ui/icons/Send";
import usePlacesAutocomplete from "use-places-autocomplete";
import { PlacesAutocomplete } from "../components/review-form/PlacesAutocomplete";
import { uploadImage } from "../firebaseConfig";

function Form(props: ReviewProps) {
  const [placeId, setPlaceId] = useState("");

  const reviewRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<any>();

  const [reviewId, setReviewId] = useState<string>(Math.random().toString());

  const collectingRefs = () => {
    const review = new Review(
      reviewRef.current!.value,
      parseInt(scoreRef.current!.value)
    );
    review.placeId = placeId;
    // review.photoId = photo.name;
    // review.sharedId = photo.sharedId;

    // console.log(review.sharedId, " och ", photo.sharedId);

    // v1 db
    // /reviews/$SharedId
    // /photos/$SharedId

    // v2 db
    // /user-generated/$SharedId/
    // /user-generated/$SharedId/review
    // /user-generated/$SharedId/photo

    setDoc(doc(db, "reviews", reviewId), { ...review });
    // addDoc(collection(db, "reviews"), { ...review });
    // setDoc(collection(db, "reviews"), { ...review });

    props.revs.push(review);
    console.log(props.revs);
  };

  const SubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addPhotoHandler();
    collectingRefs();
    reviewRef.current!.value = "";
    scoreRef.current!.value = "";
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

  const handleChange = (e: any) => {
    const newPhoto = e.target.files[0];
    setPhoto(newPhoto);
  };

  const addPhotoHandler = () => {
    //photo.sharedId = Math.random().toString();
    uploadImage(reviewId, photo);
    console.log(reviewId);
    // console.log(photo.id);
  };

  return (
    <div className="form-wrapper">
      <Box
        className="box"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
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
        {/* <TextField
          id="filled-multiline-flexible"
          placeholder="Ladda upp en bild"
          variant="filled"
          type="file"
          onChange={handleChange}
        /> */}
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
