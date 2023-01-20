import { loadAll, load_Cart, load_Products } from '$houdini';
import { getVendorFromSlug } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const parent = await event.parent();
	const wineType = event.url.searchParams.get('wineType');
	const vendor = getVendorFromSlug(event.params.vendor)?.shopifyVendor ?? '';
	return await loadAll(
		load_Products({
			event,
			variables: {
				filters: [
					{
						productVendor: vendor
					},
					wineType
						? { productMetafield: { namespace: 'custom', key: 'wine_type', value: wineType } }
						: {}
				]
			}
		}),
		load_Cart({ event, variables: { cartId: parent.cart?.id ?? '' } })
	);
};
