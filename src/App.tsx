import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ReviewForm from './pages/ReviewForm/ReviewForm';
import Reviews from './pages/Reviews/Reviews';
import Map from './pages/Map/Map';
import { Review } from './models/review';
import BakeryReviews from './components/BakeryReviews/BakeryReviews';
import FirstPage from './pages/FirstPage';
import UserProfile from './components/UserProfile/UserProfile';

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
  const reviews: Review[] = [];

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
          <Route path="form" element={<ReviewForm />} />
          <Route path="userprofile" element={<UserProfile />} />)
        </Routes>
      </>
    </Router>
  );
}

export default App;
