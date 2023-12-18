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
	The <strong
		class="text-accent inline transition duration-700 {isBlendModeDiff
			? 'mix-blend-difference'
			: 'mix-blend-multiply'}">Artful Alcove</strong
	> of davidthus
</h1>
