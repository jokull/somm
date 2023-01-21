<script lang="ts">
	import Product from './Product.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { product, vendor } = data;
</script>

<svelte:head>
	<title>{product.title} - {vendor?.name} - Somm</title>
	<meta
		name="description"
		content={`${product.title} frá ${product?.framleidandi?.value ?? product.vendor}`}
	/>
</svelte:head>

<div>
	<Product {product} />
</div>
