import React, { useState, useEffect } from "react";
import { Review, ReviewProps } from "../App";
import { getDocs, query } from "firebase/firestore";
import { db, semlaRef } from "../firebaseConfig";
import "./Reviews.scss";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

function Reviews(props: ReviewProps) {
  console.log("func comp called");
  const [reviews, setReviews] = useState<Review[]>([]);

  const getReviews = async () => {
    console.log("get reviews called");
    const snapshot = await getDocs(semlaRef);
    const newReviews: Review[] = [];
    snapshot.docs.forEach((doc) => {
      const review = new Review();
      Object.assign(review, doc.data());
      console.log(review);
      newReviews.push(review);
      // console.log(doc.data());
    });
    console.log(newReviews);
    setReviews(newReviews); //wrong
  };

  useEffect(() => {
    console.log("use effect called");
    if (reviews.length == 0) getReviews();
  }, [reviews]);

  console.log("right before return");

  const theme = useTheme();
  return (
    <div className="wrapperDiv">
      {reviews.map((item) => (
        // <Grid item xs={2}>

        <Card className="cardContainer" sx={{ display: "flex" }}>
          <CardMedia
            className="cardImg"
            component="img"
            sx={{ width: 151 }}
            image="http://localhost:3000/static/media/dani-CLtLGfF6mwI-unsplash.3b8d75a0bc796ac8cbf4.jpg"
            alt="Semla"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              {/* <Typography component="div" variant="h5">
                {item.name}
              </Typography> */}
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
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            ></Box>
          </Box>
        </Card>
      ))}
    </div>
  );
}

export default Reviews;
