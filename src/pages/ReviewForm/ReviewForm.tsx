import React, {
  ChangeEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
import { Bakery } from "../../models/bakery";

function reviewReducer(state: Review, newState: Review) {
  return newState;
}

function ReviewForm(props: {bakery?: Bakery}) {
  const [review, reviewDispatch] = useReducer(reviewReducer, new Review());
  const reviewRef = useRef<HTMLInputElement>(null);
  const [scoreValue, setScoreValue] = useState(0);
  const [photo, setPhoto] = useState<File>();
  const [reviewId, setReviewId] = useState<string>(Math.random().toString());
  const dispatch = useDispatch();
  const reviews = useSelector(
    (state: RootState) => state.bakery.reviews
  ) as Review[];

  const collectingInputData = async () => {
    review.score = scoreValue;
    review.review = reviewRef.current!.value;
    review.userId = auth.currentUser!.uid;
    if (props.bakery) review.placeId = props.bakery.placeId
    console.log("userid", review.userId);
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

  return (
    <div className="form-wrapper">
      <Card className="CardContainer">
        <CardContent>
          <Box className="box" component="form" noValidate autoComplete="off">
            {!props.bakery && (
              <PlacesAutocomplete reviewDispatch={reviewDispatch} />
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
