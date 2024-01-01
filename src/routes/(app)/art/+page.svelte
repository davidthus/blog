<script lang="ts">
	import SignedIn from '$lib/components/signedIn.svelte';
</script>

<div class="flex flex-1 justify-center">
	<section
		class="flex flex-wrap h-fit items-center py-8 px-4 flex-1 max-w-3xl gap-10 bg-background/80 rounded-2xl shadow-lg shadow-black/30 relative"
	>
		<SignedIn>
			<a href="/art/add">
				<article
					class="w-fit p-6 rounded-2xl shadow-lg max-w-52 shadow-slate-900 hover:cursor-pointer"
				>
					<h1 class="font-roman text-text text-2xl">Add artwork</h1>
				</article>
			</a>
		</SignedIn>
	</section>
</div>
