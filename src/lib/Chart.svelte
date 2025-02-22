<script lang="ts">
	import { run } from 'svelte/legacy';

	import * as d3 from 'd3';
	import { onMount, mount, hydrate } from 'svelte';
	import Card from '$lib/Card.svelte';
	import mountToNode from '$lib/node_builder';

	import type { Node, Link, GraphData } from '$lib/chart_types';

	let { data } = $props();

	let chartContainer: any = $state();
	let simulation: any = $state();
	let link: any;
	let node: any;

	function updateGraph() {
		// Update nodes and links
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
			.attr('stroke-width', (d: any) => Math.sqrt(d.size));
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
			.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

		// Add circles to the node groups
		node
			.selectAll('circle') // Select existing circles (if any)
			.data((d: any) => [d]) // One circle per group
			.join('circle')
			.attr('r', (d: any) => d.size)
			.attr('fill', (d: any) => d.color)
			.each((d: any) => mountToNode(Card, d.id, { id: d.id }));

		// Restart simulation
		simulation.alpha(1).restart();
	}

	onMount(() => {
		const width = 928;
		const height = 680;

		// Create initial SVG container
		const svg = d3
			.select(chartContainer)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
			.attr('style', 'max-width: 100%; height: auto;');

		// Create groups for links and nodes
		svg.append('g').attr('class', 'links').attr('stroke', '#999').attr('stroke-opacity', 0.6);
		svg.append('g').attr('class', 'nodes').attr('stroke', '#fff').attr('stroke-width', 1.5);

		// Initialize simulation
		simulation = d3
			.forceSimulation()
			.force(
				'link',
				d3
					.forceLink()
					.id((d: any) => d.id)
					.distance((d: any) => d.distance)
			)
			.force('charge', d3.forceManyBody())
			.force('x', d3.forceX())
			.force('y', d3.forceY())
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
			updateGraph(); // Initial graph render with labels on mount if data is available
		}
	});

	// Drag event handlers
	function dragstarted(event: any) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}

	function dragged(event: any) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}

	function dragended(event: any) {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	}

	// Reactive block to update graph when data changes
	run(() => {
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
	}
</style>
