<script lang="ts">
	import { collectionStore } from '$lib/firebase';
	import type { Story } from '$lib/types';

	const collection = collectionStore<Story>('stories');
</script>

<section class="flex flex-col flex-1 ml-10 gap-4">
	<article class="w-fit p-6 rounded-2xl shadow-lg max-w-52 shadow-slate-900 hover:cursor-pointer">
		<h1 class="font-roman text-text text-2xl">Add story</h1>
	</article>
	{#each $collection as story}
		<a href="/stories/{story.id}">
			<article
				class="w-full p-6 flex flex-col items-start gap-2 rounded-2xl shadow-lg max-w-xl shadow-slate-900 hover:cursor-pointer"
			>
				<h1 class="font-roman text-text text-2xl">{story?.name}</h1>
				<p class="font-sharp text-text text-base">{story?.description}</p>
			</article>
		</a>
	{/each}
</section>
