<script lang="ts">
	import ProductsGrid from '$lib/ProductsGrid.svelte';
	import ProductsGridSkeleton from '../../ProductsGridSkeleton.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let { Products, vendor, cart } = data;
	$: ({ Products } = data);
</script>

<svelte:head>
	<title>{vendor?.name} - Somm</title>
	<meta name="description" content={`Vín flutt inn af ${vendor?.name} til sölu á Somm`} />
</svelte:head>

<div>
	{#if $Products.fetching || !cart}
		<ProductsGridSkeleton />
	{:else if $Products.data?.collection?.products && cart}
		<ProductsGrid products={$Products.data.collection?.products} serverCart={cart} />
	{/if}
</div>
