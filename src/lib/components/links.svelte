<script>
	import Home from '$lib/icons/home.svelte';
	import { onMount } from 'svelte';

	const dateOfBirth = 1189002175;

	let currentTime = Date.now();

	onMount(() => {
		const interval = setInterval(() => {
			currentTime = Date.now();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$: realtimeAge = (currentTime - dateOfBirth) / 1000;
</script>

<div class="flex w-full justify-center absolute bottom-8">
	<div class="flex gap-4 items-center font-sharp text-lg text-text">
		<a href="/">
			<Home />
		</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://twitter.com/dvdthus" target="_blank">Twitter</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://github.com/davidthus" target="_blank">Github</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://www.youtube.com/@davidthus" target="_blank">YouTube</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://paypal.me/dvdnicorici" target="_blank">PayPal</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<a href="https://soundcloud.com/el_esqueleto/likes" target="_blank">SoundCloud</a>
		<div class="rounded-full bg-text w-2 h-2" />
		<p>{Math.round(realtimeAge)} sec ago</p>
	</div>
</div>
