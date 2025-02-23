<script lang="ts">
	let { form } = $props();

	import Chart from '$lib/Chart.svelte';
	import { Dialog, Label, Separator } from 'bits-ui';
	import '$lib/PromptInput.svelte';
	import ChatInput from '$lib/ChatInput.svelte';
	import type { GraphData } from '$lib/chart_types';
	import PromptInput from '$lib/PromptInput.svelte';

	let data = $state<GraphData>({
		nodes: [
			{ id: 'A', content: 'I want to know a fun fact about cats' },
			{ id: 'B', content: 'there are a lot of cats in rome' },
			{ id: 'C', content: 'cesaer was a roman monarch' },
			{ id: 'D', content: 'I want to know a fun fact about cats' },
			{ id: 'E', content: 'there are a lot of cats in rome' },
			{ id: 'F', content: 'cesaer was a roman monarch' }
		],
		edges: [
			{ source: 'A', target: 'B', relation: 'cats' },
			{ source: 'B', target: 'C', relation: 'rome' },
			{ source: 'D', target: 'E', relation: 'cats' },
			{ source: 'E', target: 'F', relation: 'rome' },
			{ source: 'B', target: 'F', relation: 'rome' }
		]
	});

	if (form?.nodeRels) {
		data = form.nodeRels;
	}
</script>

<!-- <main class="px-40 py-8"> -->
<main>
	<PromptInput />
	<Chart dataprop={data} />
	<ChatInput bind:nodes={data.nodes} />
</main>
