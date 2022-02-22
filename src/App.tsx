import React, { useContext, useRef, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Form from './pages/ReviewForm/Form';
import Reviews from './pages/Reviews/Reviews';
import Map from './pages/Map/Map';
import { Review } from './models/review';
import BakeryReviews from './components/BakeryReviews/BakeryReviews';
import FirstPage from './pages/FirstPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { AuthContext } from './state/AuthContextProvider';

export interface ReviewProps {
  revs: Review[];
}

// export class Photo {
//   photoId: string = '';

//   constructor(photoId: string) {
//     this.photoId = photoId;
//   }
// }

function App() {
  const authContext = useContext(AuthContext);
  const reviews: Review[] = [];
  // // const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  // onAuthStateChanged(auth, (user) => {
  //   setUserLoggedIn(!!user);
  // });

  //  /objects/object-id
  //  /objects/subobjectName/subobjectId
  //
  //  /reviews/objectName
  //  SEO
  //  REST convention
  // /bakeries/:place_id-:bakery_name
  // /bakeries/asfasdfasdf-Bakery-name-1

  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="map" element={<Map />} />
          <Route path="reviews" element={<Reviews revs={reviews} />} />
          <Route path="bakeries/:id/:name" element={<BakeryReviews />} />
          {authContext.userLoggedIn && <Route path="form" element={<Form />} />}
        </Routes>
      </>
    </Router>
  );
}

export default App;
