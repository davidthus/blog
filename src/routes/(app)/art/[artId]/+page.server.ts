import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { artId } = params;
	return { artId };
}) satisfies PageServerLoad;
