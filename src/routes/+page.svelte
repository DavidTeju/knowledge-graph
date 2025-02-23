<script lang="ts">
	import { graph } from '$lib/graphState.svelte';

	let { form } = $props();
	import { Node } from '$lib/graph_types';

	import Chart from '$lib/Chart.svelte';
	import { Dialog, Label, Separator } from 'bits-ui';
	import '$lib/PromptInput.svelte';
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

<!-- <main class="px-40 py-8"> -->
<main>
	<PromptInput />
	<Chart dataprop={data} />
	<!-- <ChatInput bind:nodes={data.nodes} /> -->
</main>
