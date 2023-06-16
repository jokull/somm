import { loadAll, load_Products } from '$houdini';
import { getVendorFromSlug } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	if (event.url.pathname) {
		console;
	}
	const wineType = event.url.searchParams.get('wineType');
	const vendor = (await event.parent()).vendor;
	if (!vendor) {
		throw new Error('Vendor should always be defined');
	}
	const vendorName = getVendorFromSlug(event.params.vendor)?.shopifyVendor ?? '';
	return {
		vendor,
		...(await loadAll(
			load_Products({
				event,
				variables: {
					filters: [
						{
							productVendor: vendorName
						},
						wineType
							? { productMetafield: { namespace: 'custom', key: 'wine_type', value: wineType } }
							: {}
					]
				}
			})
		))
	};
};
