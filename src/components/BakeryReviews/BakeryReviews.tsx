import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BakeryReviews.scss';
import { Review } from '../../models/review';
import { Bakery } from '../../models/bakery';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import ReviewCard from '../UI/ReviewCard';
import BakeryCard from '../UI/BakeryCard';

function BakeryReviews() {
  const { id, name } = useParams();
  const bakery = new Bakery(id!, name!);

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    bakery
      .reviews()
      .then(async (reviews) => setReviews(reviews))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {/* <h1>{bakery.name}</h1> */}
      <BakeryCard
        reviews={reviews}
        name={bakery.name}
        // image={review.imageUrl}
        // score={review.score}
        // review={review.review}
      />
      {/* <ul> */}
      {/* {reviews.map((review) => (
          <ReviewCard />
        ))} */}
      {/* </ul> */}
    </div>
  );
}

export default BakeryReviews;
