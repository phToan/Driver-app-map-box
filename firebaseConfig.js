// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCopHju6eCjBaJhtNFn7bGNUt3RZuWbkW0',
    authDomain: 'orderproject-32b9d.firebaseapp.com',
    databaseURL:
        'https://orderproject-32b9d-default-rtdb.asia-southeast1.firebasedatabase.app/',
    projectId: 'orderproject-32b9d',
    storageBucket: 'orderproject-32b9d.appspot.com',
    messagingSenderId: '523803921483',
    appId: '1:523803921483:web:ca7144b2a988ae021211ce',
    measurementId: 'G-BGZDCE21L4',
};

// Initialize Firebase
const firebaseDB = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseDB;
