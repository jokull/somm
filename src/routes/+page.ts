import { loadAll, load_Cart, load_Products } from '$houdini';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const parent = await event.parent();
	const wineType = event.url.searchParams.get('wineType');
	return await loadAll(
		load_Products({
			event,
			variables: {
				...(wineType
					? {
							filters: [
								{ productMetafield: { namespace: 'custom', key: 'wine_type', value: wineType } }
							]
					  }
					: {})
			}
		}),
		load_Cart({ event, variables: { cartId: parent.cart?.id ?? '' } })
	);
};
