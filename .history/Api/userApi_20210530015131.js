import React from "react";
import firebase from "firebase";

export async function getUser() {
  const user = await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(snapshot => {
        if (snapshot.exists) {
            console.log(snapshot.data())
           return snapshot.data()
        } else {
            console.log('Data not found')
        }
    }).catch(error => console.log(error))
    
    console.log(user)
}

