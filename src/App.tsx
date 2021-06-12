import { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { Context } from ".";
import { FIREBASE_AUTH_UI_CONFIG } from "./constants";

export default function App() {
  const { auth } = useContext(Context);
  const [user, setUser] = useState<firebase.User | null>();

  useEffect(() => auth.onAuthStateChanged(setUser), [auth]);

  return (
    <div>
      {!user && (
        <StyledFirebaseAuth
          uiConfig={FIREBASE_AUTH_UI_CONFIG}
          firebaseAuth={auth}
        />
      )}
    </div>
  );
}
