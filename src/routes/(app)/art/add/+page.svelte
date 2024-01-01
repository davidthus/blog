<script lang="ts">
	import { goto } from '$app/navigation';
	import AuthCheck from '$lib/components/authCheck.svelte';
	import { db, storage } from '$lib/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { writable } from 'svelte/store';

	const form = writable({ name: '', url: '' });

	let uploading = false;
	let fileUploaded = false;
	$: nameIsFilledIn = $form.name.trim().length > 5;
	let mfTriedToUploadTheArtFirst = false;
	let uploadArtMan = false;

	async function upload(e: any) {
		if (!nameIsFilledIn) {
			mfTriedToUploadTheArtFirst = true;
			return;
		} else {
			mfTriedToUploadTheArtFirst = false;
		}

		uploading = true;
		const file = e.target.files[0];
		const storageRef = ref(storage, `${$form.name}.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);
		form.update((prev: any) => ({ ...prev, url }));
		fileUploaded = true;
		uploadArtMan = false;
		uploading = false;
	}

	async function onSubmit() {
		if (!fileUploaded) {
			uploadArtMan = true;
			return;
		}

		const docRef = await addDoc(collection(db, 'art'), $form);
		if (docRef) {
			goto(`/art/${docRef.id}`);
		}
	}
</script>

<AuthCheck>
	<div class="flex flex-1 justify-center">
		<section
			class="flex flex-col h-fit items-center p-8 flex-1 max-w-3xl gap-10 bg-background/80 rounded-2xl shadow-lg shadow-black/30 relative"
		>
			<form class="flex flex-col gap-8 w-full" on:submit|preventDefault={onSubmit}>
				<label for="name" class="font-roman text-text text-2xl text-left flex flex-col gap-2">
					<div class="flex justify-between w-full">
						Name (fill in first):
						{#if mfTriedToUploadTheArtFirst}
							<p class="text-red-600 font-sharp text-xl bg-slate-800 p-2">
								FILL IN THE NAME FIRST!
							</p>
						{/if}
					</div>
					<input
						type="text"
						name="name"
						required
						class="font-roman text-text text-2xl text-center bg-background/80 rounded-xl shadow-lg shadow-black/30"
						placeholder="Heart of the mountain"
						bind:value={$form.name}
					/>
				</label>
				<label for="photoURL" class="font-roman text-text text-2xl text-left flex flex-col">
					<div class="flex justify-between w-full">
						File:
						{#if uploadArtMan}
							<p class="text-red-600 font-sharp text-xl bg-slate-800 p-2">UPLOAD THE ART FAM!</p>
						{/if}
					</div>
					<input
						class="font-roman text-text text-2xl text-center bg-background/80 rounded-xl shadow-lg shadow-black/30"
						on:change={upload}
						name="photoURL"
						type="file"
						required
						accept="image/png, image/jpeg, image/gif, image/webp"
					/>
				</label>
				{#if uploading}
					<p class="text-text font-sharp text-xl">Uploading...</p>
				{/if}
				<button
					class="outline-none border-none bg-accent rounded-xl font-roman text-text text-lg px-4 py-2"
					type="submit">Submit</button
				>
			</form>
		</section>
	</div>
</AuthCheck>
