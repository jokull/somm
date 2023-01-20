<script lang="ts">
	import ProductsGrid from '$lib/ProductsGrid.svelte';
	import ProductsGridSkeleton from '../../ProductsGridSkeleton.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let { Products, Cart } = data;
	$: ({ Products, Cart } = data);
</script>

<div>
	{#if $Products.fetching || $Cart.fetching}
		<ProductsGridSkeleton />
	{:else if $Products.data?.collection?.products && $Cart.data?.cart}
		<ProductsGrid products={$Products.data.collection?.products} serverCart={$Cart.data.cart} />
	{/if}
</div>
