import React, { useRef, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import Form from './pages/Form/Form';
import Reviews from './pages/Reviews/Reviews';
import Map from './pages/Map/Map';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Login from './pages/Login/Login';

export interface ReviewProps {
  revs: Review[];
}

export class Review {
  static storage = getStorage();
  placeId: string = '';
  review: string;
  score: number;
  imageUrl = '';
  sharedId = '';
  // sharedId: string = '';
  // imageRef: string = '';
  constructor(review = '', score = 0) {
    this.review = review;
    this.score = score;
  }

  static idToRef(id: string) {
    return ref(Review.storage, `/photos/${id}.png`);
  }

  public async fetchDownloadUrl() {
    try {
      this.imageUrl = await getDownloadURL(Review.idToRef(this.sharedId));
    } catch (err) {
      console.log(err);
      return true;
    }
  }
}

// export class Photo {
//   photoId: string = '';

//   constructor(photoId: string) {
//     this.photoId = photoId;
//   }
// }

function App() {
  const reviews: Review[] = [];
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      {!userLoggedIn && <Login setUserLoggedIn={setUserLoggedIn} />}
      {userLoggedIn && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Form revs={reviews} />} />
            <Route path="map" element={<Map />} />
            <Route path="about" element={<About />} />
            <Route path="reviews" element={<Reviews revs={reviews} />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
