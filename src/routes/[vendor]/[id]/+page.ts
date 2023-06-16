import { loadAll, load_Product } from '$houdini';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	if (event.url.pathname) {
		console;
	}
	return await loadAll(
		load_Product({
			event,
			variables: {
				id: `gid://shopify/Product/${event.params.id}`
			}
		})
	);
};
