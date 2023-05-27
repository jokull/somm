import { load_Terms } from '$houdini';
import type { PageLoadEvent } from './$types';

export async function load(event: PageLoadEvent) {
	return await load_Terms({ event, variables: undefined });
}
