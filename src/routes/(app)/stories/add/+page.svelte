<script lang="ts">
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	import { writable } from 'svelte/store';

	const form = writable({ name: '', description: '' });

	async function onSubmit() {
		const docRef = await addDoc(collection(db, 'stories'), {
			name: $form.name,
			description: $form.description
		});

		if (docRef) {
			goto(`/stories/${docRef.id}`);
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
					placeholder="The name of the mountains"
					bind:value={$form.name}
				/>
			</label>
			<label for="description" class="font-roman text-text text-2xl text-left flex flex-col">
				Description:
				<input
					type="text"
					class="font-roman text-text text-2xl text-center bg-background/80 rounded-xl shadow-lg shadow-black/30"
					required
					name="description"
					placeholder="Description in the wind"
					bind:value={$form.description}
				/>
			</label>
			<button
				class="outline-none border-none bg-accent rounded-xl font-roman text-text text-lg px-4 py-2"
				type="submit">Submit</button
			>
		</form>
	</section>
</div>
