import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAsWL0KNVQiUrqag2Y0OlaPruZtFTtTP3Q",
    authDomain: "imageupload-20245.firebaseapp.com",
    projectId: "imageupload-20245",
    storageBucket: "imageupload-20245.appspot.com",
    messagingSenderId: "326426011022",
    appId: "1:326426011022:web:08a08d530ec73832d770df"
};
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)