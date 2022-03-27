import React, { ChangeEvent, useReducer, useRef, useState } from "react";
import "./ReviewForm.scss"; //interesting that it takes styles from About.scss even though not imported? understanding why modules are good..
import { auth } from "../../firebaseConfig";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@material-ui/icons/Send";
import { PlacesAutocomplete } from "../../components/review-form/PlacesAutocomplete";
import { Review } from "../../models/review";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { bakeryActions } from "../../store/bakery-slice";
import { RootState } from "../../store";
import { Card, CardContent, Rating, Typography } from "@mui/material";

function reviewReducer(state: Review, newState: Review) {
  return newState;
}

function ReviewForm(props: any) {
  const [review, reviewDispatch] = useReducer(reviewReducer, new Review());
  const reviewRef = useRef<HTMLInputElement>(null);
  const [scoreValue, setScoreValue] = useState(0);
  const [photo, setPhoto] = useState<File>();
  const [reviewId, setReviewId] = useState<string>(Math.random().toString());
  const dispatch = useDispatch();
  const bakeryNameAlreadyKnown = useSelector(
    (state: RootState) => state.auth.bakeryNameAlreadyKnown
  );
  const reviews = useSelector(
    (state: RootState) => state.bakery.reviews
  ) as Review[];

  const collectingInputData = async () => {
    //review.score = parseInt(scoreRef.current!.value);
    review.score = scoreValue;
    review.review = reviewRef.current!.value;
    review.userId = auth.currentUser!.uid;
    await review.save();
  };

  const SubmitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await review.uploadImage(photo);
    await collectingInputData();
    reviewRef.current!.value = "";
    setScoreValue(0);
    await review.fetchDownloadUrl();
    dispatch(bakeryActions.loadReviews([review, ...reviews]));
    dispatch(authActions.setShowLoginForm(false));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhoto = e.target.files![0]!;
    setPhoto(newPhoto);
  };

  const x = () => {
    console.log("test");
    console.log(scoreValue);
  };

  return (
    <div className="form-wrapper">
      <Card className="CardContainer">
        <CardContent>
          <Box
            className="box"
            component="form"
            // sx={{
            //   marginTop: "2rem",
            //   "& .MuiTextField-root": { m: 1, width: "25ch" },
            // }}
            noValidate
            autoComplete="off"
          >
            {bakeryNameAlreadyKnown || (
              <PlacesAutocomplete reviewDispatch={reviewDispatch} />
            )}
            {bakeryNameAlreadyKnown && (
              <TextField label="review" multiline variant="filled" fullWidth />
            )}
            <TextField
              label="Review"
              multiline
              minRows="5"
              variant="filled"
              inputRef={reviewRef}
              fullWidth
            />

            <div className="rating-container">
              <Typography component="legend">Rating</Typography>

              <Rating
                name="customized-10"
                value={scoreValue}
                max={10}
                onChange={(event, newValue) => {
                  setScoreValue(newValue!);
                }}
                onClick={x}
              />
            </div>

            <input type="file" onChange={handleChange} />

            <Button
              // sx={{ margin: "2rem" }}
              className="send-button"
              variant="contained"
              onClick={SubmitHandler}
              endIcon={<SendIcon />}
              fullWidth
            >
              Send
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReviewForm;
