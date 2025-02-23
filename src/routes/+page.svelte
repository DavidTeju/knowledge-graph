<script lang="ts">
	import Chart from '$lib/Chart.svelte';
	import ChatInput from '$lib/ChatInput.svelte';
	import type { GraphData } from '$lib/chart_types';

	let data = $state<GraphData>({
		nodes: [
			{ id: 'A', content: 'I want to know a fun fact about cats' },
			{ id: 'B', content: 'there are a lot of cats in rome' },
			{ id: 'C', content: 'cesaer was a roman monarch' },
			{ id: 'D', content: 'I want to know a fun fact about cats' },
			{ id: 'E', content: 'there are a lot of cats in rome' },
			{ id: 'F', content: 'cesaer was a roman monarch' }
		],
		links: [
			{ source: 'A', target: 'B', relation: 'cats' },
			{ source: 'B', target: 'C', relation: 'rome' },
			{ source: 'D', target: 'E', relation: 'cats' },
			{ source: 'E', target: 'F', relation: 'rome' },
			{ source: 'B', target: 'F', relation: 'rome' },

		]
	});
</script>

<Chart dataprop={data} />
<ChatInput bind:nodes={data.nodes} />

<!-- <text x="5" y="30" fill="none" stroke="red" font-size="35">I love SVG!</text> -->
