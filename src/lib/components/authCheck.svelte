<script>
	import { user } from '$lib/firebase';
</script>

{#if $user && $user.email === 'dvdnicorici05@gmail.com'}
	<slot />
{:else}
	<p class="text-text font-sharp text-xl">Must be davidthus to view this page...</p>
	<a href="/" class="text-text font-sharp text-xl">Go home buddy</a>
{/if}
