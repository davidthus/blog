<script>
	import { user } from '$lib/firebase';

	let links = ['Stories', 'Art', 'Poems', 'Misc'];

	$: if ($user && $user.email === 'dvdnicorici05@gmail.com') {
		links = ['Stories', 'Art', 'Poems', 'Misc', 'Console'];
	} else {
		links = ['Stories', 'Art', 'Poems', 'Misc'];
	}
</script>

<nav class="pr-16">
	<ul class="text-text text-6xl flex flex-col gap-8 font-sharp">
		{#each links as link}
			<li class="hover:-translate-x-10 transition duration-300">
				<a href="/{link.toLowerCase()}">{link}</a>
			</li>
		{/each}
	</ul>
</nav>
