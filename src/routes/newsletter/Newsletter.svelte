<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import classNames from 'classnames';
	import type { ActionData } from './$types';
	let success = false;
	let errorMessage = '';
	type Invalid = Extract<ActionData, { missing: boolean }>;
	type Success = Extract<ActionData, { success: boolean }>;
	const submitFunction: SubmitFunction<Success, Invalid> = ({}) => {
		return async ({ result }) => {
			if (result.type === 'success') {
				success = true;
			} else if (result.type === 'failure') {
				if (result.data?.missing) {
					errorMessage = 'Netfang vantar';
				}
			}
		};
	};
</script>

<form action="/newsletter" method="POST" use:enhance={submitFunction}>
	<div>
		<div class="flex gap-2">
			<input
				type="email"
				name="email"
				required
				pattern=".+@.+\..+"
				placeholder="Netfang"
				class="w-full rounded-none sm:w-auto border-0 border-b border-neutral-500 px-0 bg-transparent placeholder-neutral-500"
			/>
			<button class={classNames('py-1 whitespace-nowrap')}> Skrá á póstlista </button>
		</div>
		{#if success}
			<div class="mt-2">Takk fyrir skráninguna, við verðum í bandi</div>
		{/if}
		{#if errorMessage}
			<div class="mt-2 text-red-600">{errorMessage}</div>
		{/if}
	</div>
</form>
