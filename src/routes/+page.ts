import { loadAll, load_Products } from '$houdini';
import type { PageLoadEvent } from './$types';

export async function load(event: PageLoadEvent) {
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
		})
	);
}
