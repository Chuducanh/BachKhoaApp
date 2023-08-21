import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
// Firebase config
// const firebaseConfig = {
//   apiKey: Constants.manifest.extra.apiKey,
//   authDomain: Constants.manifest.extra.authDomain,
//   projectId: Constants.manifest.extra.projectId,
//   storageBucket: Constants.manifest.extra.storageBucket,
//   messagingSenderId: Constants.manifest.extra.messagingSenderId,
//   appId: Constants.manifest.extra.appId,
//   databaseURL: Constants.manifest.extra.databaseURL
// };

const firebaseConfig = {
  apiKey: "AIzaSyBfECJpsFfhffUWy0LZ6AOljBvw_fRWTd4",
  authDomain: "test-pbl4.firebaseapp.com",
  projectId: "test-pbl4",
  storageBucket: "test-pbl4.appspot.com",
  messagingSenderId: "709178243359",
  appId: "1:709178243359:web:cf265deef0ce280d9b982a"
};


// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();