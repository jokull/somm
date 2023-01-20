import { env } from '$env/dynamic/private';

export interface DokobitSession {
	status: string;
	session_token: string;
	code: string;
	country_code: string;
	name: string;
	surname: string;
	authentication_method: string;
	date_authenticated: string;
	phone?: string;
}

export async function getDokobitSession(sessionToken: string) {
	const response = await fetch(
		`${env.DOKOBIT_URL}/${sessionToken}/status?access_token=${env.DOKOBIT_TOKEN}`
	);
	const data = (await response.json()) as Record<string, unknown>;
	if (data.status === 'error') throw Error(data.message as string);
	return data as unknown as DokobitSession;
}
