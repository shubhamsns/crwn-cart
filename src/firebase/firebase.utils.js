import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDm5KM8gdg2fE3GjGPftsYZ0d6EtWL9Rc8",
  authDomain: "crwn-db-755c0.firebaseapp.com",
  databaseURL: "https://crwn-db-755c0.firebaseio.com",
  projectId: "crwn-db-755c0",
  storageBucket: "crwn-db-755c0.appspot.com",
  messagingSenderId: "53141311518",
  appId: "1:53141311518:web:14f4fd8ddec120bb989e0f",
  measurementId: "G-BEVN7RV44N",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
