import React, { useRef } from 'react';
import { Review, ReviewProps } from '../App';
import './Form.scss'; //interesting that it takes styles from About.scss even though not imported? understanding why modules are good..
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db, semlaRef } from '../firebaseConfig';

function Form(props: ReviewProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);

  const collectingRefs = () => {
    const review = new Review(
      nameRef.current!.value,
      reviewRef.current!.value,
      parseInt(scoreRef.current!.value)
    );

    addDoc(collection(db, 'semla'), { ...review });

    props.revs.push(review);
    console.log(props.revs);
  };

  const SubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    collectingRefs();
    nameRef.current!.value = '';
    reviewRef.current!.value = '';
    scoreRef.current!.value = '';
  };

  return (
    <div className="main-wrapper">
      <h1 className="form-text">Let's talk about...Semlor!</h1>
      <form>
        <label htmlFor="bageri"></label>
        <input type="text" id="bageri" placeholder="Bageri" ref={nameRef} />
        <label htmlFor="message"></label>
        <input
          type="text"
          id="message"
          placeholder="Recension"
          ref={reviewRef}
        />
        <label htmlFor="score"></label>
        <input type="number" id="score" placeholder="Score" ref={scoreRef} />
        <button className="btn-submit" onClick={SubmitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
