<script lang="ts">
	import Dialog from '$lib/DialogBase.svelte';
	let { id, size, content } = $props();
	let count = $state(0);
</script>

<foreignObject width={size} height={size} transform="translate(-{size / 2},-{size / 2})">
	<div
		class="card shadow-popover grid h-100 w-100 place-items-center
    rounded-2xl

    bg-gray-700"
	>
		<Dialog {content} />
	</div>
</foreignObject>
