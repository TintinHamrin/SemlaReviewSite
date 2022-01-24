import React, { useRef } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Form from "./pages/Form";
import Reviews from "./pages/Reviews";
import Map from "./pages/Map";

export interface ReviewProps {
  revs: Review[];
}

export class Review {
  placeId: string = "";
  review: string;
  score: number;
  constructor(review = "", score = 0) {
    this.review = review;
    this.score = score;
  }
}

function App() {
  const reviews: Review[] = [];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form revs={reviews} />} />
        <Route path="map" element={<Map />} />
        <Route path="about" element={<About />} />
        <Route path="reviews" element={<Reviews revs={reviews} />} />
      </Routes>
    </Router>
  );
}

export default App;
