import firebase from "firebase";

export async function getWorkouts() {

    return firebase.firestore().collection('workouts').onSnapshot(querySnapshot => {
        const workouts = []

        quesrySnapshot.forEach(documentSnapshot => {
            workouts.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id
            })
        })
    })
}