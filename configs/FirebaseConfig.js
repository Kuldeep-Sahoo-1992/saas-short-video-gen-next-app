// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWXkoiElmiiqGBIAZyGP8RW9KSPDH12pw",
  authDomain: "saas-short-video-gen.firebaseapp.com",
  projectId: "saas-short-video-gen",
  storageBucket: "saas-short-video-gen.firebasestorage.app",
  messagingSenderId: "328030838811",
  appId: "1:328030838811:web:d9293799ef1d85316618be",
  measurementId: "G-7K3Y9C6P21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
