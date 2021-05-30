import React from "react";
import firebase from "firebase";

export async function getUser() {
  const id = await firebase.auth().currentUser.uid;
  firebase
    .firestore()
    .collection("users")
    .doc(id)
    .get()
    .then(snapshot => {
        if (snapshot.exists) {
            console.log(snapshot.data())
        }
    })
}
