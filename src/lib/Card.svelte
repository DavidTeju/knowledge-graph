<script lang="ts">
	import { graph } from '$lib/graphState.svelte';
	import { SvelteMap } from 'svelte/reactivity';

	let { nodeId, size } = $props();
	// id ;
	let count = $state(0);

	const onClick = () => {
		// console.log(graph.nodeMap);
		console.log(graph);
		const edge = graph.nodeMap.get(nodeId)!.createEdge(count.toString(), "is count of");
		graph.nodeMap.set(edge.target.id, edge.target);
		// console.log(graph.nodeMap);
		graph.nodeMap = new SvelteMap(graph.nodeMap);
		count++;
	};
</script>

<foreignObject
	width={size}
	height={size}
	transform="translate(-{size/2},-{size/2})"
	class="place-content-between rounded-2xl bg-teal-500 p-2"
	><div class="card">
		<button
			class="rounded bg-blue-500 p-5 font-bold text-white hover:bg-blue-700"
			onclick={onClick}
		>
			{nodeId}: {count}
		</button>
	</div></foreignObject
>
