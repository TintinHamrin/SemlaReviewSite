import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Review } from './review';

export class ReviewLike {
  id: string;
  likerId: string;
  reviewId: string;

  constructor(review: Review) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.likerId = getAuth().currentUser!.uid;
    this.reviewId = review.sharedId;
    this.id = `${this.likerId}-${this.reviewId}`;
  }

  public async isPersisted(): Promise<boolean> {
    const docSnap = await getDoc(this.doc());
    return !docSnap.exists();
  }

  public async save() {
    await setDoc(this.doc(), {
      likerId: this.likerId,
      reviewId: this.reviewId,
    });
  }

  public async destroy() {
    await deleteDoc(this.doc());
  }

  public static async likesCount(reviewId: string) {
    const searchRef = collection(db, 'likes');
    const searchQuery = query(searchRef, where('reviewId', '==', reviewId));
    const snapshot = await getDocs(searchQuery);
    return snapshot.size;
  }

  private doc() {
    return doc(db, 'likes', this.id);
  }
}
