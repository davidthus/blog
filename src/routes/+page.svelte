<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isBlendModeDiff: boolean = true;

	onMount(() => {
		const interval = setInterval(() => {
			isBlendModeDiff = isBlendModeDiff ? false : true;
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<h1 class="text-8xl w-full max-w-2xl text-center text-text font-roman">
	The {#if isBlendModeDiff}
		<strong
			transition:fade={{ delay: 500, duration: 400 }}
			class="text-accent inline transition duration-700 mix-blend-difference">Artful Alcove</strong
		>
	{:else}
		<strong
			transition:fade={{ delay: 500, duration: 400 }}
			class="text-accent inline transition duration-700 mix-blend-multiply">Artful Alcove</strong
		>
	{/if} of davidthus
</h1>
