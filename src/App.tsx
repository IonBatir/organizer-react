import { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import dayjs from "dayjs";
import "dayjs/locale/ro";

import "./App.css";
import { Context } from ".";
import { FIREBASE_AUTH_UI_CONFIG } from "./constants";
import { Calendar, MonthSelector, Organizer } from "./components";

export default function App() {
  dayjs.locale("ro");
  const { auth } = useContext(Context);
  const [user, setUser] = useState<firebase.User | null>();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => auth.onAuthStateChanged(setUser), [auth]);

  return user ? (
    <div className="container">
      <header>
        <MonthSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </header>
      <main>
        <Calendar />
      </main>
      <div>
        <Organizer />
      </div>
    </div>
  ) : (
    <StyledFirebaseAuth
      uiConfig={FIREBASE_AUTH_UI_CONFIG}
      firebaseAuth={auth}
    />
  );
}
