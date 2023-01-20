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
</script>

<div class="flex justify-between gap-2">
	{#if cartLine}
		<div class="hidden sm:block">
			<CartLineItemQuantity line={cartLine} {cart} />
		</div>
	{:else}
		<button
			class={classNames(
				!$addCartItem.fetching ? 'hover:text-[blue] underline whitespace-nowrap' : ''
			)}
			on:click={(event) => {
				event.preventDefault();
				addCartItem.mutate({ cartId: cart.id, lineItem: { merchandiseId: variant.id } });
			}}
		>
			{$addCartItem.fetching ? 'Augnablik' : 'Bæta í körfu'}
		</button>
	{/if}
</div>
