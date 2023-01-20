<script lang="ts">
	import ProductsGrid from '$lib/ProductsGrid.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { Products } = data;
	$: ({ Products, Cart } = data);
</script>

<div>
	{#if $Products.data?.collection?.products && $Cart.data?.cart}
		<ProductsGrid products={$Products.data.collection?.products} serverCart={$Cart.data.cart} />
	{/if}
</div>
