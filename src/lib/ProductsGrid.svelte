<script lang="ts">
	import { graphql, type Cart$result } from '$houdini';
	import type { Product } from '$lib/types';
	import classNames from 'classnames';
	import ProductCard from './ProductCard.svelte';

	import type { ClientCartVariables } from './$houdini';

	export let serverCart: NonNullable<Cart$result['cart']>;

	export const _ClientCartVariables: ClientCartVariables = () => {
		return { cartId: serverCart.id };
	};

	const store = graphql(`
		query ClientCart($cartId: ID!) {
			cart(id: $cartId) {
				...CartFields
			}
		}
	`);

	export let products: { edges: Product[] };
	$: filteredProducts = products.edges.filter(({ node }) =>
		node.variants.edges.find(({ node }) => node.image?.url)
	);

	$: cart = $store.data?.cart ?? serverCart;
</script>

<div
	class={classNames(
		'grid gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-8 mb-12 pb-12 md:mb-28 md:pb-28 last-of-type:border-none last-of-type:pb-0',
		'grid-cols-[repeat(auto-fill,minmax(min(10rem,100%),1fr))]',
		'md:grid-cols-[repeat(auto-fill,minmax(min(12rem,100%),1fr))]',
		'lg:grid-cols-[repeat(auto-fill,minmax(min(14rem,100%),1fr))]',
		'xl:grid-cols-[repeat(auto-fill,minmax(min(18rem,100%),1fr))]'
	)}
>
	{#if filteredProducts.length > 0}
		{#each filteredProducts as product}
			<ProductCard product={product.node} {cart} />
		{/each}
	{:else}
		<span>Engar vörur</span>
	{/if}
</div>
