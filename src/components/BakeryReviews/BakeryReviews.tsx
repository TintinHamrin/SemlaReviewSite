import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BakeryReviews.scss';
import { Bakery } from '../../models/bakery';
import BakeryCard from '../UI/BakeryCard';
import { bakeryActions } from '../../store/bakery-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

function BakeryReviews() {
  const { id, name } = useParams();
  const bakery = new Bakery(id!, name!);
  const puss = 'puss';
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.bakery.reviews);

  useEffect(() => {
    console.log('useffect');
    bakery
      .reviews()
      .then(async (reviews) => dispatch(bakeryActions.loadReviews(reviews)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <BakeryCard reviews={reviews} name={bakery.name} />
    </div>
  );
}

export default BakeryReviews;
