<script>
	import { onMount } from 'svelte';
	import '../app.css';

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

	$: realtimeAge = new Date(currentTime - dateOfBirth);
	console.log(realtimeAge);
</script>

<main
	class="bg-[url('/wolfBackground.jpg')] bg-no-repeat bg-cover bg-right-top min-w-screen min-h-screen flex justify-between items-center flex-row-reverse relative"
>
	<nav class="pr-16">
		<ul class="text-text text-6xl flex flex-col gap-8 font-sharp">
			<li class="hover:-translate-x-10 transition duration-300"><a href="/writing">Writing</a></li>
			<li class="hover:-translate-x-10 transition duration-300"><a href="/poems">Poems</a></li>
			<li class="hover:-translate-x-10 transition duration-300"><a href="/art">Art</a></li>
			<li class="hover:-translate-x-10 transition duration-300"><a href="/stories">Stories</a></li>
		</ul>
	</nav>
	<div class="flex w-full justify-center absolute bottom-8">
		<div class="flex gap-4 items-center font-sharp text-lg text-text">
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
			<p>{realtimeAge.getFullYear()}</p>
		</div>
	</div>
	<slot />
</main>
