import { collection, doc, getDocs } from "@firebase/firestore";
import {
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { db } from "../firebaseConfig";
import { Review } from "./review";

export class Bakery {
  placeId = "";
  name = "";
  lat = 0;
  lng = 0;
  imageUrls: string[] = []; // add default image / images

  constructor(placeId: string, name: string) {
    this.name = name;
    this.placeId = placeId;
  }

  static async all() {
    const bakeriesRefFireStore = collection(db, "bakeries");
    const bakeriesRefSnapshot = await getDocs(bakeriesRefFireStore);
    return bakeriesRefSnapshot.docs.map((doc) => {
      return new Bakery(doc.id, doc.data().name);
    });
  }

  static async find(placeId: Bakery) {
    const bakeriesRefFireStore = collection(db, "bakeries");
    const bakeriesRefSnapshot = await getDocs(bakeriesRefFireStore);
    console.log(bakeriesRefSnapshot);
  }

  public async loadDetails() {
    const reviews = await this.reviews();
    this.imageUrls = reviews.map((r) => r.imageUrl);
    return this
  }

  public url() {
    return `${this.placeId}/${this.name}`;
  }

  private async fetchCoordinates() {
    if (this.lat != 0) return;

    await getGeocode({ address: this.name })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
        this.lat = lat;
        this.lng = lng;
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  }

  public async save() {
    await this.fetchCoordinates();
    console.log("saving coord" + this.lat);
    await setDoc(doc(db, "bakeries", this.placeId), {
      name: this.name,
      lat: this.lat,
      lng: this.lng,
    });
  }

  public async reviews() {
    return Review.getReviewsFromBakery(this);
  }

  // public async reload() {
  //   const bakery = await Bakery.find(this.placeId)
  //   Object.assign(this, bakery)
  // }
}
