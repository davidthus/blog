<script lang="ts">
	import { collectionStore } from '$lib/firebase';

	interface Story {
		name: string;
		description: string;
		id: string;
	}

	const collection = collectionStore<Story>('stories');
</script>

<section class="flex flex-col flex-1 ml-10 gap-4 max-w-xl">
	{#each $collection as story}
		<article class="w-full p-6 flex flex-col items-start gap-2">
			<h1 class="font-roman text-white text-2xl">{story?.name}</h1>
			<p class="font-sharp text-white text-base">{story?.description}</p>
		</article>
	{/each}
</section>
