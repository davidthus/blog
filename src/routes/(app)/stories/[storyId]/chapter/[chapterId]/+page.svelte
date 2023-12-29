<script lang="ts">
	import { docStore } from '$lib/firebase';
	import type { Chapter } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const chapter = docStore<Chapter>(`/stories/${data.storyId}/chapters/${data.chapterId}`);
</script>

<div class="flex flex-1 justify-center">
	<section
		class="flex flex-col h-[60vh] items-center py-8 px-4 flex-1 mx-10 max-w-3xl gap-4 bg-background/80 rounded-2xl shadow-lg shadow-black/30"
	>
		{#if chapter}
			<h1 class="font-roman text-text text-6xl text-center">{$chapter?.name}</h1>
			<iframe src="{$chapter?.link}?embedded=true" class="w-full h-1/2" title="chapter content"
			></iframe>
		{/if}
	</section>
</div>
