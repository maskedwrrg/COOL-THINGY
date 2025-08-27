// Firebase Configuration
// Replace with your actual Firebase config from the Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyC2UOJ3ClN6Jw0zx_7wBB1nO2IvggwFXzQ",
    authDomain: "moonshot-crash.firebaseapp.com",
    databaseURL: "https://moonshot-crash-default-rtdb.firebaseio.com",
    projectId: "moonshot-crash",
    storageBucket: "moonshot-crash.firebasestorage.app",
    messagingSenderId: "669491600892",
    appId: "1:669491600892:web:bd5d5ddc5284b4b51ae679",
    measurementId: "G-V28NTSDZ1F"
  };c

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const realtimeDb = firebase.database();
const storage = firebase.storage();

console.log("Firebase initialized successfully");
