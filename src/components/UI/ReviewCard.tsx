/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import "./ReviewCard.scss";
import { useEffect, useState } from "react";
import { Review } from "../../models/review";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface IReviewCard {
  review: Review;
}

function ReviewCard(props: IReviewCard) {
  const [counter, setCounter] = useState<number>();

  const onLikeHandler = async () => {
    props.review
      .toggleLike()
      .then(() => props.review.likesCount().then((cnt) => setCounter(cnt)))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    props.review
      .likesCount()
      .then((cnt) => setCounter(cnt))
      .catch((e) => console.error(e));
  }, [counter]);


  return (
    <Card sx={{ maxWidth: 345 }} className="review-card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.review.imageUrl}
          className="review-img"
        />
        <CardContent>
          <Rating
            name="customized-10"
            defaultValue={props.review.score}
            max={10}
            readOnly
          />
          <Typography
            variant="body2"
            color="text.secondary"
            className="review-review"
          >
            {props.review.review}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <span>
          {counter}
          <Button>
            <ThumbUpIcon
              color="primary"
              fontSize="large"
              onClick={onLikeHandler}
            />
          </Button>
        </span>
      </CardActions>
    </Card>
  );
}

export default ReviewCard;
