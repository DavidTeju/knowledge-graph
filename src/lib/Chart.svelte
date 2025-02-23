<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import Card from '$lib/Card.svelte';
	import mountToNode from '$lib/node_builder';

	let { dataprop } = $props();
	let data = $derived(JSON.parse(JSON.stringify(dataprop)));
	let chartContainer: any = $state();
	let simulation: any = $state();
	let link: any;
	let node: any;
	const line_distance = 200;
	const line_size = 4;

	function updateGraph() {
		simulation.nodes(data.nodes);
		simulation.force('link').links(data.links);

		// Update link elements
		link = d3
			.select(chartContainer)
			.select('svg')
			.select('g.links')
			.selectAll('line')
			.data(data.links)
			.join('line')
			.attr('stroke-width', Math.sqrt(line_size));
		// Update node elements (grouping circle and label)
		node = d3
			.select(chartContainer)
			.select('svg')
			.select('g.nodes')
			.selectAll('.node') // Select the group elements
			.data(data.nodes)
			.join('g') // Create group elements for each node
			.attr('class', 'node') // Add a class for styling
			.attr('width', 100)
			.attr('height', 100)
			.attr('id', (d: any) => d.id)
			.each((d: any) => mountToNode(Card, d.id, { id: d.id }));
		// .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));
		// Restart simulation
		simulation.alpha(1).restart();
	}

	onMount(() => {
		// Create initial SVG container
		const svg = d3
			.select(chartContainer)
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
			// .attr('viewBox', `-${1000 / 2} -${1000 / 2} ${1500 / 2} ${1500 / 2}`)
			.attr('preserveAspectRatio', 'xMidYMid meet') // Centers content
			.attr('style', 'max-width: 100%; height: auto;');

		// Create groups for links and nodes
		let vp = svg.append('g');
		vp.append('g').attr('class', 'links').attr('stroke', '#999').attr('stroke-opacity', 0.6);
		vp.append('g').attr('class', 'nodes').attr('stroke', '#fff').attr('stroke-width', 1.5);

		// Initialize simulation
		simulation = d3
			.forceSimulation()
			.force(
				'link',
				d3
					.forceLink()
					.id((d: any) => d.id)
					.distance(line_distance)
			)
			.force('charge', d3.forceManyBody().strength(-10000))
			.force('x', d3.forceX().strength(0.5))
			.force('y', d3.forceY().strength(0.5))

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

		if (data) {
			initZoom();
			updateGraph(); // Initial graph render with labels on mount if data is available
		}
	});

	function handleZoom(event: any) {
		d3.select('svg g').attr('transform', event.transform);
	}
	function initZoom() {
		d3.select('svg').call(d3.zoom().on('zoom', handleZoom));
	}

	$effect(() => {
		if (simulation && data) {
			updateGraph();
		}
	});
</script>

<div bind:this={chartContainer}></div>

<style>
	div {
		display: flex;
		justify-content: center;
		position: fixed;
		width: 100%;
		height: 90vh; /* Viewport height */
	}
</style>
