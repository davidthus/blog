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

	$: realtimeAge = (currentTime - dateOfBirth) / 1000;
	console.log(realtimeAge);

	const links = ['Writing', 'Poems', 'Art', 'Stories'];
</script>

<main
	class="bg-[url('/wolfBackground.jpg')] bg-no-repeat bg-cover bg-right-top min-w-screen min-h-screen flex justify-between items-center flex-row-reverse relative"
>
	<nav class="pr-16">
		<ul class="text-text text-6xl flex flex-col gap-8 font-sharp">
			{#each links as link}
				<li class="hover:-translate-x-10 transition duration-300">
					<a href="/{link.toLowerCase()}">{link}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="flex w-full justify-center absolute bottom-8">
		<div class="flex gap-4 items-center font-sharp text-lg text-text">
			<a href="/"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="24"
					height="24"
					viewBox="0,0,256,256"
					style="fill:#FFFFFF;"
				>
					<g
						fill="#FFFFFF"
						fill-rule="nonzero"
						stroke="none"
						stroke-width="1"
						stroke-linecap="butt"
						stroke-linejoin="miter"
						stroke-miterlimit="10"
						stroke-dasharray=""
						stroke-dashoffset="0"
						font-family="none"
						font-weight="none"
						font-size="none"
						text-anchor="none"
						style="mix-blend-mode: normal"
						><g transform="scale(5.33333,5.33333)"
							><path
								d="M39.5,43h-9c-1.381,0 -2.5,-1.119 -2.5,-2.5v-9c0,-1.105 -0.895,-2 -2,-2h-4c-1.105,0 -2,0.895 -2,2v9c0,1.381 -1.119,2.5 -2.5,2.5h-9c-1.381,0 -2.5,-1.119 -2.5,-2.5v-19.087c0,-2.299 1.054,-4.471 2.859,-5.893l14.212,-11.199c0.545,-0.428 1.313,-0.428 1.857,0l14.214,11.199c1.805,1.422 2.858,3.593 2.858,5.891v19.089c0,1.381 -1.119,2.5 -2.5,2.5z"
							></path></g
						></g
					>
				</svg></a
			>
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
	<slot />
</main>
