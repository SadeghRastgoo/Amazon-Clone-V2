var firebaseConfig = {
  apiKey: "AIzaSyD7bhmNPhXC9WcH8B6UlkixaKYJ6a8Q3nI",
  authDomain: "clone-two-e8dad.firebaseapp.com",
  projectId: "clone-two-e8dad",
  storageBucket: "clone-two-e8dad.appspot.com",
  messagingSenderId: "167370930110",
  appId: "1:167370930110:web:2c319abc13db0e1012abef",
  measurementId: "G-49QM142FVQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();