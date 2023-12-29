<script lang="ts">
	import SignedIn from '$lib/components/signedIn.svelte';
	import { collectionStore, docStore } from '$lib/firebase';
	import type { Chapter, Story } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const story = docStore<Story>(`/stories/${data.storyId}`);
	const chapters = collectionStore<Chapter>(`/stories/${data.storyId}/chapters`);
</script>

<section
	class="flex flex-col items-center py-8 px-4 flex-1 mx-10 max-w-3xl gap-4 bg-background/80 rounded-2xl shadow-lg shadow-black/30"
>
	<h1 class="font-roman text-text text-6xl text-center">{$story?.name}</h1>
	<p class="font-roman text-text text-2xl mb-12">{$story?.description}</p>
	<p class="font-roman text-text text-2xl mb-8">Chapters:</p>
	<ul class="flex flex-col w-full gap-2">
		<SignedIn>
			<li class="w-fit rounded-md py-2 px-4 shadow-md shadow-slate-900/70 hover:cursor-pointer">
				<h2 class="font-roman text-text text-xl">New Chapter</h2>
			</li>
		</SignedIn>
		{#each $chapters as chapter, i}
			<li class="w-full rounded-md py-2 px-4 shadow-md shadow-slate-900/70">
				<a href={`/stories/${data.storyId}/chapter/${chapter.id}`}>
					<h2 class="font-roman text-text text-xl">Chapter {i + 1} - {chapter.name}</h2>
				</a>
			</li>
		{/each}
	</ul>
</section>
