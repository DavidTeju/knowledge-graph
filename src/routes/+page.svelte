<script lang="ts">
	import { graph } from '$lib/graphState.svelte';

	let { form } = $props();
	import { Node } from '$lib/graph_types';

	import Chart from '$lib/Chart.svelte';
	import ChatInput from '$lib/ChatInput.svelte';


	if (form?.nodeRels) {
		const {head, nodeMap} = Node.buildGraph(form.nodeRels);
		graph.head = head;
		graph.nodeMap = nodeMap;
	}

	let graphSerialized = $derived(graph.nodeMap.get(graph.head.id)!.extractGraph())
	// $effect(() => {
	// 	console.log(graph.nodeMap);
	// })
</script>

<main>
	<p>Hey</p>
	<form method="POST" action="?/fetchData">
		<input type="text" id="prompt" name="prompt" placeholder="Prompt" value={form?.prompt} required>
		<button type="submit"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 active:transform-translate">
			Default
		</button>
	</form>


	<p>{form?.nodeRels}</p>

	<Chart dataprop={graphSerialized} />
	<ChatInput bind:nodes={graphSerialized.nodes} />
</main>

<style>
    main {
        padding: 2rem 10%;
				min-height: 100vh;
				min-width: 100vw;
    }
</style>