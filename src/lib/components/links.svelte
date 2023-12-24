<script>
	import { auth, user } from '$lib/firebase';
	import Home from '$lib/icons/home.svelte';

	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}
</script>

<div class="flex w-full justify-center absolute bottom-8">
	<div class="flex gap-4 items-center font-sharp text-lg text-text">
		<a href="/">
			<Home />
		</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://twitter.com/dvdthus" target="_blank">Twitter</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://github.com/davidthus" target="_blank">GitHub</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://www.youtube.com/@davidthus" target="_blank">YouTube</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://paypal.me/dvdnicorici" target="_blank">PayPal</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://soundcloud.com/el_esqueleto/likes" target="_blank">SoundCloud</a>
		<div class="rounded-full bg-text w-2 h-2" />
		{#if $user}
			<button
				class="outline-none border-none bg-red-600 py-2 px-4 rounded-lg"
				on:click={() => signOut(auth)}>Sign Out</button
			>
		{:else}
			<button
				class="outline-none border-none bg-accent py-2 px-4 rounded-lg"
				on:click={signInWithGoogle}>Login</button
			>
		{/if}
	</div>
</div>
