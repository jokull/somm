<script lang="ts">
	import classNames from 'classnames';

	export let href: string;
	export let option: string | null;
	export let current: string | null;
</script>

<a {href} class={classNames(current === option ? 'underline' : '', 'font-medium cursor-pointer')}>
	<span class="whitespace-nowrap">{option ?? 'Öll vín'}</span>
</a>
