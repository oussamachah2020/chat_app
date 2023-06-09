"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFsHT61NXlAbLL8AMZBqyGsiNm-DODE4g",
    authDomain: "chat-app-cd005.firebaseapp.com",
    projectId: "chat-app-cd005",
    storageBucket: "chat-app-cd005.appspot.com",
    messagingSenderId: "1005730063421",
    appId: "1:1005730063421:web:89fc6bf5d098363e653654",
    measurementId: "G-6SSCV0E5XZ",
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
//  initialize storage bucket
exports.storage = (0, storage_1.getStorage)(app);
//# sourceMappingURL=firebase.js.map