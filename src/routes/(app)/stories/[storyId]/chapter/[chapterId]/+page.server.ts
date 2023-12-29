import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { storyId, chapterId } = params;

	return { storyId, chapterId };
}) satisfies PageServerLoad;
