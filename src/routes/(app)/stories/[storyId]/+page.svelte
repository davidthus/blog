<script lang="ts">
	import SignedIn from '$lib/components/signedIn.svelte';
	import { collectionStore, docStore } from '$lib/firebase';
	import Cross from '$lib/icons/cross.svelte';
	import Delete from '$lib/icons/delete.svelte';
	import Edit from '$lib/icons/edit.svelte';
	import type { Chapter, Story } from '$lib/types';
	import { deleteDoc, updateDoc } from 'firebase/firestore';
	import type { PageData } from './$types';

	export let data: PageData;

	const story = docStore<Story>(`/stories/${data.storyId}`);
	const chapters = collectionStore<Chapter>(`/stories/${data.storyId}/chapters`);

	let editMode = false;
	let redButtonActivated = false;

	$: storyName = $story?.name;
	$: storyDescription = $story?.description;

	$: console.log(storyName, storyDescription);

	function changeEditMode() {
		editMode = !editMode;
	}

	async function activateRedButton() {
		if (redButtonActivated) {
			await deleteDoc(story.ref);
		} else {
			redButtonActivated = !redButtonActivated;
		}
	}

	function closeRedButton() {
		redButtonActivated = false;
	}

	async function formSubmit() {
		await updateDoc(story.ref, {
			name: storyName,
			description: storyDescription
		});
	}
</script>

<section
	class="flex flex-col items-center relative py-8 px-4 flex-1 mx-10 max-w-3xl gap-4 bg-background/80 rounded-2xl shadow-lg shadow-black/30"
>
	<div class="flex flex-col absolute gap-4 right-4 top-8 items-end">
		<Edit on:click={changeEditMode} />
		<div
			class="flex flex-col items-center gap-2 {redButtonActivated
				? 'bg-background rounded-xl py-2 px-1 shadow-2xl shadow-slate-900 flex-col-reverse'
				: ''}"
		>
			<Delete on:click={activateRedButton} />
			{#if redButtonActivated}
				<Cross on:click={closeRedButton} />
			{/if}
		</div>
	</div>
	{#if editMode}
		<form class="flex flex-col items-center gap-5" on:submit={formSubmit}>
			<input
				class="font-roman text-text text-6xl text-center bg-background/80 rounded-2xl shadow-lg shadow-black/30"
				bind:value={storyName}
			/>
			<input
				class="font-roman text-text text-2xl mb-8 text-center bg-background/80 rounded-xl shadow-lg shadow-black/30"
				bind:value={storyDescription}
			/>
		</form>
	{:else}
		<h1 class="font-roman text-text text-6xl text-center">{$story?.name}</h1>
		<p class="font-roman text-text text-2xl mb-12">{$story?.description}</p>
	{/if}
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
