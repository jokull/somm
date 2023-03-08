import { getVendorFromSlug, vendors } from '$lib/utils';

import { CartStore, graphql, type Cart$result } from '$houdini';
import { seal, unseal } from '$lib/session';
import type { LayoutServerLoadEvent } from './$types';

export const load = async (event) => {
	const { params, url, cookies } = event as LayoutServerLoadEvent;
	const session = await unseal(cookies);

	let cart: Cart$result['cart'] = null;

	const CreateCart = graphql(`
		mutation createCart($input: CartInput) {
			cartCreate(input: $input) {
				cart {
					...CartFields
				}
			}
		}
	`);

	if (session.cartId) {
		const store = new CartStore();
		const response = await store.fetch({
			event,
			variables: { cartId: session.cartId }
		});
		cart = response.data?.cart ?? null;
	}

	if (!cart) {
		const { data } = await CreateCart.mutate({}, { event });
		if (data?.cartCreate?.cart) {
			await seal(cookies, { cartId: data.cartCreate.cart.id });
			cart = data.cartCreate.cart;
		}
	}

	return {
		vendor: getVendorFromSlug(params.vendor ?? ''),
		vendors: Object.values(vendors),
		wineType: url.searchParams.get('wineType'),
		session: session,
		cart
	};
};
