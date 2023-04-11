import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyBUbGK9IxUJO4UdZFTRrDpdjw_3nNcoT-A",
    authDomain: "room-check-71a0c.firebaseapp.com",
    databaseURL:
      "https://room-check-71a0c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "room-check-71a0c",
    storageBucket: "room-check-71a0c.appspot.com",
    messagingSenderId: "579657857041",
    appId: "1:579657857041:web:34e5f4be408158e6b099b0",
    measurementId: "G-E1GQXM06N8",
  };
  

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Room(props) {
  const [checked, setChecked] = useState(false);
  const [roomRef, setRoomRef] = useState(null);

  useEffect(() => {
 
    const roomRef = firebase.database().ref(`rooms/${props.number}`);
    setRoomRef(roomRef);

 
    roomRef.on("value", (snapshot) => {
      const checkedState = snapshot.val();
      setChecked(checkedState);
    });

 
    return () => {
      roomRef.off("value");
    };
  }, [props.number]);

  const handleCheckboxChange = (event) => {
 
    roomRef.set(event.target.checked);


    const now = new Date();
    const millisUntil5AM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0, 0) - now;
    if (millisUntil5AM < 0) {
      millisUntil5AM += 24 * 60 * 60 * 1000;
    }
    setTimeout(() => {
      roomRef.remove();
    }, millisUntil5AM);
  };

  return (
    <div className={`room ${checked ? "checked" : "unchecked"}`}>
      <h1>Room {props.number}</h1>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
    </div>
  );
}

export default Room;



