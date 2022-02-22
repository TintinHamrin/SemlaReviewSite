import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReviewCard from './ReviewCard';
import { Review } from '../../models/review';
import Form from '../../pages/ReviewForm/Form';
import { Link } from 'react-router-dom';

interface IBakeryCard {
  name: string;
  reviews: Review[];
}

export default function BakeryCard(props: IBakeryCard) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Skriv din egen recension <Link to={'/'}>har!</Link>
          </Typography>
        </CardContent>

        <CardContent>
          {props.reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
