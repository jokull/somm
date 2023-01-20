<script lang="ts">
	import DesktopCart from '$lib/DesktopCart.svelte';
	import { graphql, type Cart$result } from '$houdini';

	import type { CartClientCartVariables } from './$houdini';

	export let serverCart: NonNullable<Cart$result['cart']>;

	export const _CartClientCartVariables: CartClientCartVariables = () => {
		return { cartId: serverCart.id };
	};

	const store = graphql(`
		query CartClientCart($cartId: ID!) {
			cart(id: $cartId) {
				...CartFields
			}
		}
	`);

	$: cart = $store.data?.cart ?? serverCart;
</script>

<div class="font-sans">
	<div class="sm:hidden">
		<!-- <MobileCart
          cart={cart}
          onRemoveLine={remove}
          isValidating={isValidating}
        /> -->
	</div>
	<div class="hidden sm:block">
		<DesktopCart {cart} />
	</div>
</div>
