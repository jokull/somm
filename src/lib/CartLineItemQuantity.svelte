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
		const oldQuantity = Number(quantity);
		// Optimistic update
		line = { ...line, node: { ...line.node, quantity } };
		updateCartItem
			.mutate({
				cartId: cart.id,
				lineItemId,
				quantity
			})
			.catch(() => {
				// Revert the optimistic update
				line = { ...line, node: { ...line.node, quantity: oldQuantity } };
			});
	}
</script>

<div class="whitespace-nowrap">
	<div class="tabular-nums nums whitespace-nowrap flex items-center gap-2 text-sm">
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
			class="enabled:text-[blue] disabled:text-neutral-500"
		>
			<Plus />
		</button>
	</div>
</div>
