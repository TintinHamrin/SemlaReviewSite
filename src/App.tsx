import React, { Suspense } from "react";
import "./App.scss";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ReviewForm from "./pages/ReviewForm/ReviewForm";
import Map from "./pages/Map/Map";
import { Review } from "./models/review";
import FirstPage from "./pages/FirstPage";
import { ThemeProvider, createTheme } from "@mui/material";

const UserProfile = React.lazy(
  () => import("./components/UserProfile/UserProfile")
);
const BakeryCard = React.lazy(() => import("./components/UI/BakeryCard"));
const Reviews = React.lazy(() => import("./pages/Reviews/Reviews"));

export interface ReviewProps {
  revs: Review[];
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#4e342e",
    },
    secondary: {
      main: "#fff6de",
    },
    background: {
      paper: "#fff6de",
      default: "#fffbf2",
    },
    // text: {
    //   primary: "#e91e63",
    // },
    info: {
      main: "#f4511e",
    },
  },
  typography: {
    fontFamily: "Dosis",
    fontSize: 16,
  },
});

function App() {
  const reviews: Review[] = [];


  // const methodDoesNotExist = () => {
  //   throw new Error("error hehe");
  // };

  return (
    <Router>
      <>
        <ThemeProvider theme={theme}>
          <Navbar />
          {/* <button onClick={methodDoesNotExist}>Send an error to sentry</button>; */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="SemlaReviewSite" element={<FirstPage />} />
              <Route path="/" element={<FirstPage />} />
              <Route path="map" element={<Map />} />
              <Route path="reviews" element={<Reviews revs={reviews} />} />
              <Route path="bakeries/:id/:name" element={<BakeryCard />} />
              <Route path="form" element={<ReviewForm />} />
              <Route path="userprofile" element={<UserProfile />} />)
            </Routes>
          </Suspense>
        </ThemeProvider>
      </>
    </Router>
  );
}

export default App;


function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
//TODO
// review: reviewfield, sendbutton, overall look
// fix auto complete looks ugly
// have already defined bakery in review form when accessing from bakery page
