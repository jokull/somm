<script lang="ts">
	import Instagram from './Instagram.svelte';

	import type { getVendorFromSlug } from './utils';
	export let vendor: NonNullable<ReturnType<typeof getVendorFromSlug>>;
	export let linkify: boolean;
</script>

<div class="flex items-center gap-2">
	{#if linkify}
		<a href={`/${vendor.slug}`} class="text-xl font-bold hover:text-[blue]">
			{vendor.name}
		</a>
	{:else}
		<strong class="text-xl">{vendor.name}</strong>
	{/if}
	<Instagram {vendor} />
</div>
