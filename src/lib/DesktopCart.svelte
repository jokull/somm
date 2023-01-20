<script lang="ts">
	import { fly } from 'svelte/transition';

	import { graphql, type Cart$result } from '$houdini';
	import classNames from 'classnames';
	import CartLineItemQuantity from './CartLineItemQuantity.svelte';
	import CartLineTitle from './CartLineTitle.svelte';
	import TrashIcon from './TrashIcon.svelte';

	export let cart: NonNullable<Cart$result['cart']>;

	const removeCartItem = graphql(`
		mutation RemoveCartItem($cartId: ID!, $lineItemId: ID!) {
			cartLinesRemove(cartId: $cartId, lineIds: [$lineItemId]) {
				cart {
					...CartFields
				}
			}
		}
	`);

	function remove(lineItemId: string) {
		removeCartItem.mutate({
			cartId: cart.id,
			lineItemId
		});
	}

	let open = false;
</script>

<nav class="fixed right-4 top-3 z-20">
	<button
		on:click={() => {
			open = !open;
		}}
		class="bg-neutral-900 text-white rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium gap-2"
	>
		Karfa
		{#if cart.totalQuantity > 0}
			<span>{cart.totalQuantity}</span>
		{/if}

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width={2}
			stroke="currentColor"
			class={classNames('w-4 h-4 transition-transform', open ? 'rotate-180' : '')}
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
		</svg>
	</button>

	{#if open}
		<div
			transition:fly={{ y: -20, duration: 250 }}
			class={classNames(
				'bg-gray-100 rounded-md flex flex-col gap-2 p-6 mt-2 w-[480px] absolute z-10 top-10 right-0',
				open ? 'pointer-events-auto' : 'pointer-events-none'
			)}
		>
			{#if cart.lines.edges.length > 0}
				{#each cart.lines.edges as line}
					<div class="flex gap-2">
						<div class="truncate min-w-0 w-full">
							{#key line.node.id}
								<CartLineTitle {line} />
							{/key}
						</div>
						<CartLineItemQuantity {cart} {line} />
						<div class="whitespace-nowrap tabular-nums slashed-zero shrink-0 w-[105px] text-right">
							{parseInt(line.node.cost.totalAmount.amount).toLocaleString('de-DE', {
								maximumFractionDigits: 0
							})}{' '}
							kr
						</div>
						<div class="whitespace-nowrap">
							<button
								class={classNames(removeCartItem && 'opacity-20', 'hover:text-[blue]')}
								on:click={() => remove(line.node.id)}
							>
								<TrashIcon />
							</button>
						</div>
					</div>
				{/each}

				<div class="border-t mt-2 pt-3 flex justify-between font-medium">
					<div>Samtals</div>
					<div class="shrink-0 w-[105px] text-right">
						{parseInt(cart.cost.totalAmount.amount).toLocaleString('de-DE', {
							maximumFractionDigits: 0
						})}{' '}
						kr
					</div>
				</div>
				<div class="mt-2">
					<form method="POST" action="/checkout">
						<button
							class="w-full font-medium shadow-xl text-lg flex items-center justify-center gap-2 py-3 px-4 rounded-md text-white bg-neutral-900"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width={1.5}
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
								/>
							</svg>
							<div>Auðkenni</div>
						</button>
					</form>
				</div>
			{:else}
				<div>Tóm karfa</div>
			{/if}
		</div>
	{/if}
</nav>
