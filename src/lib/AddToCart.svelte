<script lang="ts">
	import classNames from 'classnames';
	import { graphql, type Cart$result } from '$houdini';
	import type { Product } from './types';
	import CartLineItemQuantity from './CartLineItemQuantity.svelte';

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
	$: soldOut = variant.quantityAvailable !== null ? variant.quantityAvailable === 0 : false;
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
