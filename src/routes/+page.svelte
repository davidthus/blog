<script lang="ts">
	import { onMount } from 'svelte';

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
		class="text-accent relative inline transition duration-700 mix-blend-difference {isBlendModeDiff
			? 'opacity-1'
			: 'opacity-0'} before:content-[Artful_Alcove] before:text-accent before:block before:absolute before:{isBlendModeDiff
			? 'opacity-0'
			: 'opacity-1'} before:inset-0 mix-blend-multiply before:transition before:duration-700"
		>Artful Alcove</strong
	> of davidthus
</h1>
