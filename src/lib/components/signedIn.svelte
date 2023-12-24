<script>
	import { user } from '$lib/firebase';
</script>

{#if $user && $user.email === 'dvdnicorici05@gmail.com'}
	<slot />
{/if}
