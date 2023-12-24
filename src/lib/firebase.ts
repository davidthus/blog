import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';

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
export const auth = getAuth();
export const storage = getStorage();

export function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(db, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}
