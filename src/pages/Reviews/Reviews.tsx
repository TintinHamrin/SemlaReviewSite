import { useState, useEffect } from "react";
import { ReviewProps } from "../../App";
import "./Reviews.scss";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Bakery } from "../../models/bakery";
import { CardMedia } from "@mui/material";
import { Review } from "../../models/review";

function Reviews(props: ReviewProps) {
  const [bakeries, setBakeries] = useState<Bakery[]>([]);

  useEffect(() => {
    if (bakeries.length == 0)
      Bakery.all()
        .then((bakeries) => Promise.all (bakeries.map((b) => b.loadDetails())))
        .then((bakeries) => setBakeries(bakeries))
        .catch((e) => console.error("error fetching bakeries"));
  }, [bakeries]);

  return (
    <div className="review-wrapper">
      {bakeries.map((bakery) => (
        <Card className="review-container">
          <Box>
            <CardContent className="name-container">
              <Typography component="div" variant="h5">
                <Link
                  className="link"
                  color="palette.text.primary"
                  to={"/bakeries/" + bakery.url()}
                >
                  {bakery.name}
                </Link>
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            className="image-container"
            component="img"
            sx={{ width: 151 }}
            image={bakery.imageUrls[0]}
          />
        </Card>
      ))}
    </div>
  );
}

export default Reviews;
