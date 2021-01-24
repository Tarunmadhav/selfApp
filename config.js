import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    
        apiKey: "AIzaSyAgKx4S65q-QVeybxBz8T-KVDxgd-ZlDeg",
        authDomain: "self-app-eebeb.firebaseapp.com",
        projectId: "self-app-eebeb",
        storageBucket: "self-app-eebeb.appspot.com",
        messagingSenderId: "14031757652",
        appId: "1:14031757652:web:35d0ea0f99a8a871bb28c1"
      
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();