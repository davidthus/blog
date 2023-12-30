<script lang="ts">
	import SignedIn from '$lib/components/signedIn.svelte';
	import { docStore } from '$lib/firebase';
	import Cross from '$lib/icons/cross.svelte';
	import Delete from '$lib/icons/delete.svelte';
	import Edit from '$lib/icons/edit.svelte';
	import type { Chapter } from '$lib/types';
	import { deleteDoc, updateDoc } from 'firebase/firestore';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	const chapter = docStore<Chapter>(`/stories/${data.storyId}/chapters/${data.chapterId}`);

	let editMode = false;
	let redButtonActivated = false;

	const form = writable({ name: '', link: '', id: '' });

	$: console.log($form);

	$: form.set($chapter ?? { name: '', link: '', id: '' });

	function changeEditMode() {
		editMode = !editMode;
	}

	async function activateRedButton() {
		if (redButtonActivated) {
			await deleteDoc(chapter.ref);
		} else {
			redButtonActivated = !redButtonActivated;
		}
	}

	function closeRedButton() {
		redButtonActivated = false;
	}

	async function formSubmit() {
		await updateDoc(chapter.ref, {
			name: $form.name,
			link: $form.link
		});
		editMode = false;
	}
</script>

<div class="flex flex-1 justify-center">
	<section
		class="flex flex-col h-[60vh] items-center py-8 px-4 flex-1 mx-10 max-w-3xl gap-10 bg-background/80 rounded-2xl shadow-lg shadow-black/30 relative"
	>
		<SignedIn>
			<div class="flex flex-col absolute gap-4 right-4 top-8 items-center">
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
		</SignedIn>
		{#if chapter}
			{#if editMode}
				<form class="flex flex-col items-center gap-5" on:submit={formSubmit}>
					<input
						class="font-roman text-text text-6xl text-center bg-background/80 rounded-2xl shadow-lg shadow-black/30"
						bind:value={$form.name}
					/>
					<input
						class="font-roman text-text text-2xl text-center bg-background/80 rounded-xl shadow-lg shadow-black/30"
						bind:value={$form.link}
					/>
					<button
						class="outline-none border-none bg-accent rounded-xl font-roman text-text text-lg px-4 py-2 mb-4"
						type="submit">Submit</button
					>
				</form>
			{:else}
				<h1 class="font-roman text-text text-6xl text-center">{$chapter?.name}</h1>
				<iframe src="{$chapter?.link}?embedded=true" class="w-full h-1/2" title="chapter content"
				></iframe>
			{/if}
		{/if}
	</section>
</div>
