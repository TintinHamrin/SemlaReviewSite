import React, { useState, useEffect } from 'react';
import { Review, ReviewProps } from '../App';
import { getDocs, query } from 'firebase/firestore';
import { db, reviewRef } from '../firebaseConfig';
import './Reviews.scss';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Reviews(props: ReviewProps) {
  const storage = getStorage();
  const [reviews, setReviews] = useState<Review[]>([]);

  const getReviews = async () => {
    const snapshot = await getDocs(reviewRef);
    const newReviews: Review[] = [];
    snapshot.docs.forEach((doc) => {
      const review = new Review();
      Object.assign(review, doc.data());
      console.log(review);
      newReviews.push(review);
    });
    console.log(newReviews);
    setReviews(newReviews);
  };

  useEffect(() => {
    if (reviews.length == 0) getReviews();
  }, [reviews]);

  const getDownloadURL = async (sharedId: string) => {
    const fileRef = ref(storage, `/reviews/${sharedId}/image.png`);
    // return fileRef;
    console.log('from reviews', fileRef);
  };

  const theme = useTheme();
  return (
    <div className="wrapperDiv">
      {reviews.map((item) => (
        // <Grid item xs={2}>

        <Card className="cardContainer" sx={{ display: 'flex' }}>
          <CardMedia
            className="cardImg"
            component="img"
            sx={{ width: 151 }}
            // image="http://localhost:3000/static/media/dani-CLtLGfF6mwI-unsplash.3b8d75a0bc796ac8cbf4.jpg"
            // image={}
            alt="Semla"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {item.placeId}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {item.score}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {item.review}
              </Typography>
            </CardContent>
            <Box
              sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
            ></Box>
          </Box>
        </Card>
      ))}
    </div>
  );
}

export default Reviews;
