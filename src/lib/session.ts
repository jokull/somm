import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

import { sealData, unsealData } from 'iron-session/edge';
import { z } from 'zod';
const sessionSchema = z.object({ cartId: z.string().optional() });

export async function unseal(cookies: Cookies) {
	return sessionSchema.parse(
		await unsealData(cookies.get('session') ?? '', { password: env.SECRET_KEY })
	);
}

export async function seal(cookies: Cookies, session: Partial<z.infer<typeof sessionSchema>>) {
	const oldSession = await unseal(cookies);
	cookies.set(
		'session',
		await sealData({ ...oldSession, ...session }, { password: env.SECRET_KEY }),
		{ path: '/', maxAge: 365 * 24 * 60 * 60 }
	);
}
