import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA5LjvFj1cvzji5yCjd4XowOOom4j_C840',
	authDomain: 'artful-alcove.firebaseapp.com',
	projectId: 'artful-alcove',
	storageBucket: 'artful-alcove.appspot.com',
	messagingSenderId: '328563996066',
	appId: '1:328563996066:web:f27dd6afb8224ecd3b2efb',
	measurementId: 'G-Q61QKJ9D59'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
