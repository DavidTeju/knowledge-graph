<script lang="ts">
	import Chart from '$lib/Chart.svelte';
	import type { Node, Link, GraphData } from '$lib/chart_types';

	let nodes = [
		{ id: 'A', size: 14, color: '#5B85AA' },
		{ id: 'B', size: 8, color: '#5B85AA' },
		{ id: 'C', size: 8, color: '#F46036' }
	];
	let links = [
		{ source: 'A', target: 'B', distance: 500, size: 3, relation: 'color' },
		{ source: 'B', target: 'C', distance: 500, size: 2, relation: 'size' }
	];
	let data = { nodes: nodes, links: links };
</script>

<Chart {data} />

<!-- <text x="5" y="30" fill="none" stroke="red" font-size="35">I love SVG!</text> -->
