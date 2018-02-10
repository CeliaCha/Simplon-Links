export const config = {
    apiKey: "AIzaSyBHiSogpGGIDb696kdAzNyIMO7sHDCPTfg",
    authDomain: "simplon-links.firebaseapp.com",
    databaseURL: "https://simplon-links.firebaseio.com",
    projectId: "simplon-links",
    storageBucket: "simplon-links.appspot.com",
    messagingSenderId: "421544035386"
};

export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.database();
export const linksRef = db.ref("liens");



//DEV
export function log(stuff) {
    console.log(stuff);
  }