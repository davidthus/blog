import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { storyId } = params;

	return { storyId };
}) satisfies PageServerLoad;
