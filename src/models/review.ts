import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { db } from '../firebaseConfig';
import { Bakery } from './bakery';
import { ReviewLike } from './reviewLike';

export class Review {
  static storage = getStorage();

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  placeId: string = '';
  review: string;
  score: number;
  imageUrl = '';
  nameOfBakery = '';
  userId = '';

  sharedId = Math.random().toString();

  constructor(review = '', score = 0) {
    this.review = review;
    this.score = score;
  }

  static idToRef(id: string) {
    return ref(Review.storage, `/photos/${id}.png`);
  }

  static deserialize(doc: QueryDocumentSnapshot<DocumentData>) {
    const review = new Review();
    Object.assign(review, doc.data());
    review.sharedId = doc.id;
    return review;
  }

  // static find(id: string) {
  // }

  public async fetchDownloadUrl() {
    try {
      this.imageUrl = await getDownloadURL(Review.idToRef(this.sharedId));
    } catch (err) {
      console.log(err);
      return true;
    }
  }

  public async save() {
    console.log(this);
    console.log(this.sharedId);
    await setDoc(doc(db, 'reviews', this.sharedId), { ...this });
    await this.createBakeryIfNecessary();
  }

  private async createBakeryIfNecessary() {
    // check if bakery exists
    const bakery = new Bakery(this.placeId, this.nameOfBakery);
    await bakery.save();
  }

  async uploadImage(data: any) {
    console.log(this);
    // const fileRef = ref(storage, `/reviews/${reviewId}/${file}.png`);
    const fileRef = Review.idToRef(this.sharedId);
    await uploadBytes(fileRef, data);
  }

  static async getReviewsFromBakery(bakery: Bakery): Promise<Review[]> {
    const q = query(
      collection(db, 'reviews'),
      where('placeId', '==', bakery.placeId)
    );
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data().review);
        return Review.deserialize(doc);
      }
    );
    await Promise.all(reviews.map((review) => review.fetchDownloadUrl()));
    return reviews;
  }

  static async getLikesPerBakery(placeId: Review) {
    //how notate this function return???
    const q = query(collection(db, 'reviews'), where('placeId', '==', placeId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs;
  }

  public async toggleLike() {
    const reviewLike = new ReviewLike(this);
    // const reviewLike = ReviewLike.findOrInitializeByReviewId(this.sharedId)
    if (await reviewLike.isPersisted()) {
      await reviewLike.save();
    } else {
      await reviewLike.destroy();
    }
  }

  public async likesCount() {
    return ReviewLike.likesCount(this.sharedId);
  }
}
