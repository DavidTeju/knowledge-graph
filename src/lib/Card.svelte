<script lang="ts">
	let { id } = $props();
	let count = $state(0);
</script>

<foreignObject
	width="100"
	height="100"
	transform="translate(-50,-50)"
	style="background-color: rgb(160, 193, 185); border-radius: 1rem; padding: 0.5rem;"
	><div class="card">
		<text>{id}</text>
		<button onclick={() => count++}>
			clicks: {count}
		</button>
	</div></foreignObject
>
