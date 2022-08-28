// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAz3WWjKGoGgQVK-G5k31hsYE9Wph2Piqg',
	authDomain: 'zara-29b40.firebaseapp.com',
	projectId: 'zara-29b40',
	storageBucket: 'zara-29b40.appspot.com',
	messagingSenderId: '158324054798',
	appId: '1:158324054798:web:fd50f6b71697ba217e155f',
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
