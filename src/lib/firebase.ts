import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
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

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = userStore();

export function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(db, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			console.log(snapshot.data());
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

export function collectionStore<T>(ref: string, startWith: T[] = []) {
	let unsubscribe: () => void;

	// Fallback for SSR
	if (!globalThis.window) {
		const { subscribe } = writable(startWith);
		return {
			subscribe,
			ref: null
		};
	}

	const colRef = typeof ref === 'string' ? collection(db, ref) : ref;

	const { subscribe } = writable(startWith, (set) => {
		unsubscribe = onSnapshot(colRef, (snapshot) => {
			const data = snapshot.docs.map((s) => {
				return { id: s.id, ref: s.ref, ...s.data() } as T;
			});
			set(data);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: colRef
	};
}
