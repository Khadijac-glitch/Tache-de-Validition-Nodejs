// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU3D79y7a3BghpVX4FeiZvD_yXZkvmbC4",
  authDomain: "tache-21-d5145.firebaseapp.com",
  projectId: "tache-21-d5145",
  storageBucket: "tache-21-d5145.appspot.com",
  messagingSenderId: "147617183410",
  appId: "1:147617183410:web:c26de2d6cc4876449efbab",
  measurementId: "G-8792MZZWSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);