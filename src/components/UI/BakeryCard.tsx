import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReviewCard from "./ReviewCard";
import ReviewForm from "../../pages/ReviewForm/ReviewForm";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import "./BakeryCard.scss";
import { useParams } from "react-router-dom";
import { bakeryActions } from "../../store/bakery-slice";
import { Bakery } from "../../models/bakery";
import { Divider } from "@mui/material";

export default function BakeryCard() {
  const { id, name } = useParams();
  const bakery = new Bakery(id!, name!);
  const puss = "puss";
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.bakery.reviews);

  useEffect(() => {
    bakery
      .reviews()
      .then(async (reviews) => dispatch(bakeryActions.loadReviews(reviews)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Card
        className="CardContainer"
        style={{
          color: "secondary.main",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 30 }} align="center" color="text.secondary" gutterBottom>
            {bakery.name}
          </Typography>
        </CardContent>
        <Card variant="outlined">
          <CardContent>
            <ReviewForm backgroundColor="background.paper"/>
          </CardContent>
        </Card>
        <Typography sx={{ fontSize:30}}color="text.secondary" align="center" gutterBottom>
            Reviews
          </Typography>
          <Divider variant="fullWidth" />
        {reviews.map((review) => (
          <CardContent>
            <ReviewCard review={review} />
          </CardContent>
        ))}
      </Card>
    </div>
  );
}
