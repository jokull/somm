<script lang="ts">
	import ProductsGrid from '$lib/ProductsGrid.svelte';
	import ProductsGridSkeleton from '../../ProductsGridSkeleton.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ Products, vendor, cart } = data);
	$: vendorName = vendor.name;
</script>

<svelte:head>
	<title>{vendorName} - Somm</title>
	<meta name="description" content={`Vín flutt inn af ${vendorName} til sölu á Somm`} />
</svelte:head>

<div>
	{#if $Products.fetching || !cart}
		<ProductsGridSkeleton />
	{:else if $Products.data?.collection?.products && cart}
		<ProductsGrid products={$Products.data.collection?.products} {cart} />
	{/if}
</div>
