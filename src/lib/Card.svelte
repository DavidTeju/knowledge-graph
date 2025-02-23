<script lang="ts">
	let { id, size } = $props();
	let count = $state(0);
</script>

<foreignObject
	width={size}
	height={size}
	transform="translate(-{size/2},-{size/2})"
	class="place-content-between rounded-2xl bg-teal-500 p-2"
	><div class="card">
		<button
			class="rounded bg-blue-500 p-5 font-bold text-white hover:bg-blue-700"
			onclick={() => count++}
		>
			{id}: {count}
		</button>
	</div></foreignObject
>
