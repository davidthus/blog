<script lang="ts">
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	const form = writable({ name: '', link: '' });

	async function onSubmit() {
		const docRef = await addDoc(collection(db, 'stories', data.storyId, 'chapters'), {
			name: $form.name,
			link: $form.link
		});

		console.log('Chapter ref', docRef);

		if (docRef) {
			goto(`/stories/${data.storyId}/chapter/${docRef.id}`);
		}
	}
</script>

<div class="flex flex-1 justify-center">
	<section
		class="flex flex-col h-fit items-center p-8 flex-1 max-w-3xl gap-10 bg-background/80 rounded-2xl shadow-lg shadow-black/30 relative"
	>
		<form class="flex flex-col gap-8 w-full" on:submit|preventDefault={onSubmit}>
			<label for="name" class="font-roman text-text text-2xl text-left flex flex-col gap-2">
				Name:
				<input
					type="text"
					name="name"
					required
					class="font-roman text-text text-2xl text-center bg-background/80 rounded-xl shadow-lg shadow-black/30"
					placeholder="Heart of the mountain"
					bind:value={$form.name}
				/>
			</label>
			<label for="link" class="font-roman text-text text-2xl text-left flex flex-col">
				Link:
				<input
					type="text"
					class="font-roman text-text text-2xl text-center bg-background/80 rounded-xl shadow-lg shadow-black/30"
					name="link"
					placeholder="The link in the chain"
					bind:value={$form.link}
				/>
			</label>
			<button
				class="outline-none border-none bg-accent rounded-xl font-roman text-text text-lg px-4 py-2"
				type="submit">Submit</button
			>
		</form>
	</section>
</div>
