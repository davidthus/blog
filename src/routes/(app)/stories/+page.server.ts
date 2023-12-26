import { collectionStore } from '$lib/firebase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const collection = collectionStore('stories');

	return { collection };
}) satisfies PageServerLoad;
