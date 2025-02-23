<script lang="ts">
	import { graph } from '$lib/graphState.svelte';
	let { form } = $props();
	import { Node } from '$lib/graph_types';
	import Chart from '$lib/Chart.svelte';
	import PromptInput from '$lib/PromptInput.svelte';
	import '$lib/PromptInput.svelte';

	if (form?.nodeRels) {
		const { head, nodeMap } = Node.buildGraph(form.nodeRels);
		graph.head = head;
		graph.nodeMap = nodeMap;
	}

	let graphSerialized = $derived(graph.nodeMap?.get(graph.head?.id)?.extractGraph());
</script>

<!-- <main class="px-40 py-8"> -->
<main>
	{#if !graphSerialized}
		<PromptInput />
	{/if}
	<!-- <form method="POST" action="?/fetchData"> -->
	<!-- 	<input -->
	<!-- 		type="text" -->
	<!-- 		id="prompt" -->
	<!-- 		name="prompt" -->
	<!-- 		placeholder="Prompt" -->
	<!-- 		value={form?.prompt} -->
	<!-- 		required -->
	<!-- 	/> -->
	<!-- 	<button -->
	<!-- 		type="submit" -->
	<!-- 		class="active:transform-translate me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" -->
	<!-- 	> -->
	<!-- 		Default -->
	<!-- 	</button> -->
	<!-- </form> -->
	{#if graphSerialized}
		<Chart dataprop={graphSerialized} />
	{/if}
</main>
