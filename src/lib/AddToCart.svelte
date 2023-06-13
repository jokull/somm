<script lang="ts">
	import { graphql, type Cart$result } from '$houdini';
	import classNames from 'classnames';
	import CartLineItemQuantity from './CartLineItemQuantity.svelte';
	import type { Product } from './types';

	export let cart: NonNullable<Cart$result['cart']>;
	export let variant: Product['node']['variants']['edges'][0]['node'];

	const addCartItem = graphql(`
		mutation AddCartItem($cartId: ID!, $lineItem: CartLineInput!) {
			cartLinesAdd(cartId: $cartId, lines: [$lineItem]) {
				cart {
					...CartFields
				}
			}
		}
	`);

	$: cartLine = cart.lines.edges.find(({ node }) => node.merchandise.id === variant.id);
	$: soldOut = !variant.availableForSale;
</script>

<div class="flex justify-between gap-2">
	{#if cartLine}
		<div>
			<CartLineItemQuantity line={cartLine} {cart} />
		</div>
	{:else}
		<button
			class={classNames(
				'whitespace-nowrap',
				soldOut || $addCartItem.fetching ? 'text-neutral-400' : 'hover:text-[blue] underline'
			)}
			disabled={soldOut}
			on:click={(event) => {
				event.preventDefault();
				addCartItem.mutate({ cartId: cart.id, lineItem: { merchandiseId: variant.id } });
			}}
		>
			{#if soldOut}
				Uppselt
			{:else}
				{$addCartItem.fetching ? 'Augnablik' : 'Bæta í körfu'}
			{/if}
		</button>
	{/if}
</div>
