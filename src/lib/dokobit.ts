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

export async function getDokobitRedirectUrl(returnUrl: string) {
	const data = await fetch(`${env.DOKOBIT_URL}/create?access_token=${env.DOKOBIT_TOKEN}`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ return_url: returnUrl })
	}).then((response) => {
		if (response.status !== 200) {
			throw new Error(response.statusText);
		}
		return response.json() as unknown;
	});
	return (data as { url: string }).url;
}

export async function getDokobitSession(sessionToken: string) {
	const response = await fetch(
		`${env.DOKOBIT_URL}/${sessionToken}/status?access_token=${env.DOKOBIT_URL}`
	);
	const data = (await response.json()) as Record<string, unknown>;
	if (data.status === 'error') throw Error(data.message as string);
	return data as unknown as DokobitSession;
}
