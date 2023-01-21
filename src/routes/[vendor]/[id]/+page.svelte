<script lang="ts">
	import Product from './Product.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { product, vendor, cart } = data;
</script>

<svelte:head>
	<title>{product.title} - {vendor?.name} - Somm</title>
	<meta
		name="description"
		content={`${product.title} frá ${product?.framleidandi?.value ?? product.vendor}`}
	/>
</svelte:head>

<div>
	{#if cart}
		<Product serverCart={cart} {product} />
	{/if}
</div>
