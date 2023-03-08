import type { ProductVariables } from './$houdini';

export const _ProductVariables: ProductVariables = (event) => {
	return {
		id: `gid://shopify/Product/${event.params.id}`
	};
};
