import { getAuth } from 'firebase/auth';

export default class User {
  user = getAuth();
  joinedDate = '';
  //user = getauth

  //   constructor();

  //   static async currentUser() {
  //     const auth = await getAuth();
  //     const user = await auth.currentUser;
  //     // console.log(user);
  //   }

  //   static currentUser() {
  //     const auth = getAuth();
  //     auth.currentUser
  //       .then((response) => response.email)
  //       .catch((e) => console.error(e));
  //     // console.log(user);
  //   }
}
