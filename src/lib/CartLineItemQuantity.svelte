<script lang="ts">
	import Minus from './Minus.svelte';
	import Plus from './Plus.svelte';

	import { graphql, type Cart$result } from '$houdini';

	export let cart: NonNullable<Cart$result['cart']>;
	export let line: (typeof cart)['lines']['edges'][0];

	const updateCartItem = graphql(`
		mutation UpdateCartItem($cartId: ID!, $lineItemId: ID!, $quantity: Int) {
			cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineItemId, quantity: $quantity }]) {
				cart {
					...CartFields
				}
			}
		}
	`);

	function update(lineItemId: string, quantity: number) {
		updateCartItem.mutate(
			{
				cartId: cart.id,
				lineItemId,
				quantity
			},
			{
				optimisticResponse: {
					cartLinesUpdate: {
						cart: {
							...cart,
							lines: {
								edges: cart.lines.edges.map((line) => ({
									...line,
									node: {
										...line.node,
										quantity: line.node.id === lineItemId ? quantity : line.node.quantity
									}
								}))
							}
						}
					}
				}
			}
		);
	}
</script>

<div class="whitespace-nowrap">
	<div class="tabular-nums whitespace-nowrap flex items-center gap-2 text-sm">
		<button
			on:click={() => {
				update(line.node.id, line.node.quantity - 1);
			}}
			class="text-[blue]"
		>
			<Minus />
		</button>
		<div class="leading-none mt-0.5">{line.node.quantity}</div>
		<button
			on:click={() => {
				update(line.node.id, line.node.quantity + 1);
			}}
			disabled={!line.node.merchandise.availableForSale}
			class="enabled:text-[blue] disabled:text-neutral-500"
		>
			<Plus />
		</button>
	</div>
</div>
