import firebase from "firebase/app";

export const FIREBASE_AUTH_UI_CONFIG = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};
