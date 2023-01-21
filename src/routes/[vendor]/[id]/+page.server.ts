import { ProductStore } from '$houdini';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const id = `gid://shopify/Product/${event.params.id}`;
	const store = new ProductStore();
	const product = await store.fetch({ event, variables: { id } });
	if (!product.data?.product) {
		throw error(404);
	}
	return { product: product.data.product };
};
