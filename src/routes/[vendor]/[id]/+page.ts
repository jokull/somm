import { load_Product } from '$houdini';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const id = `gid://shopify/Product/${event.params.id}`;
	return await load_Product({ event, variables: { id } });
};
