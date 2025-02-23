<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import Card from '$lib/Card.svelte';
	import type { SerializableGraph } from '$lib/graph_types';

	let { dataprop }: { dataprop: SerializableGraph } = $props();
	let data: SerializableGraph = $derived(JSON.parse(JSON.stringify(dataprop)));
	let chartContainer = $state<HTMLDivElement>();
	let simulation: any = $state();
	let link: any;
	let node: any;
	const card_size = 600;
	const line_distance = card_size * 1.5;
	const line_size = 10;
	const line_color = 'var(--color-pink-400)';

	function updateGraph() {
		simulation.nodes(data.nodes);
		simulation.force('link').links(data.edges);

		// Update link elements
		link = d3
			.select(chartContainer!)
			.select('svg g.links')
			.selectAll('line')
			.data(data.edges)
			.join('line')
			.style('stroke', line_color);

		// Update node elements (grouping circle and label)
		node = d3
			.select(chartContainer!)
			.select('svg g.nodes')
			.selectAll('.node') // Select the group elements
			.data(data.nodes);

		// Restart simulation
		simulation.alpha(1).restart();
	}

	onMount(() => {
		// TODO: @Robel Is this useful?
		d3.select(chartContainer).attr(
			'viewBox',
			`-${window.screen.height / 2} -${window.screen.width / 2} ${window.screen.height} ${window.screen.width}`
		);

		// Initialize simulation
		simulation = d3
			.forceSimulation()
			.force(
				'link',
				d3
					.forceLink()
					.id((d) => d.id)
					.distance(line_distance)
			)
			.force(
				'charge',
				d3.forceManyBody().strength((_, i) => (i == 0 ? -100 : -0.2))
			)
			.force('collide', d3.forceCollide(line_distance))
			.force(
				'x',
				d3.forceX().strength((_, i) => (i == 0 ? 1 : -0.05))
			)
			.force(
				'y',
				d3.forceY().strength((_, i) => (i == 0 ? 1 : -0.05))
			)
			.on('tick', () => {
				// Update positions on each tick
				link
					?.attr('x1', (d: any) => d.source.x)
					?.attr('y1', (d: any) => d.source.y)
					?.attr('x2', (d: any) => d.target.x)
					?.attr('y2', (d: any) => d.target.y);

				// Update node positions (move the group element)
				node?.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
			});

		initZoom();
		if (data) {
			updateGraph(); // Initial graph render with labels on mount if data is available
		}
	});
	let myZoom = d3.zoom().scaleExtent([0.3, 4]).on('zoom', handleZoom);

	function handleZoom(event: any) {
		d3.select('svg g').attr('transform', event.transform);
	}

	function initZoom() {
		d3.select('svg').call(myZoom);
	}

	$effect(() => {
		if (simulation && data) {
			updateGraph();
		}
	});
</script>

<div bind:this={chartContainer}>
	<svg
		class="canvas"
		width="100%"
		height="100%"
		preserveAspectRatio="xMidYMid meet"
		style="max-width: 100%; height: auto;"
	>
		<g>
			<g class="links" stroke="#999" stroke-opacity="0.6" stroke-width={line_size}> </g>
			<g class="nodes">
				{#each data.nodes as node (node.id)}
					<g class="node" id={node.id} width="100" height="100">
						<Card {node} size={card_size} />
					</g>
				{/each}
			</g>
		</g>
	</svg>
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		position: fixed;
		width: 100%;
		height: 100vh; /* Viewport height */
	}
</style>
