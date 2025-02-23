<script lang="ts">
	let { id } = $props();
	let count = $state(0);
</script>

<foreignObject
	width="100"
	height="100"
	transform="translate(-50,-50)"
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
