<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import Card from '$lib/Card.svelte';
	import { mountToNode, mountToEdge } from '$lib/mount_utils';

	let { dataprop } = $props();
	let data = $derived(JSON.parse(JSON.stringify(dataprop)));
	let chartContainer: any = $state();
	let simulation: any = $state();
	let link: any;
	let node: any;
	let nodelink: any;
	const card_size = 500;
	const line_distance = card_size * 2;
	const line_size = 100;
	const line_color = 'red';

	function updateGraph() {
		simulation.nodes(data.nodes);
		simulation.force('link').links(data.edges);

		// Update link elements
		link = d3
			.select(chartContainer)
			.select('svg')
			.select('g.links')
			.selectAll('line')
			.data(data.edges)
			.join('line')
			.attr('stroke-width', Math.sqrt(line_size))
			.style('stroke', line_color)
			.attr('id', (line: any) => `${line.source.id}-${line.target.id}`)
			.each((line: any) => mountToEdge(line));

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
			.each((d: any) => mountToNode(Card, d.id, { id: d.id, size: card_size, content: d.content }));

		nodelink = d3
			.select(chartContainer)
			.select('svg')
			.select('g.nodelinks')
			.selectAll('.nodelinks')
			.data(data.edges)
			.join('g')
			.attr('width', 100)
			.attr('height', 100)
			// .attr('transform', (nodelink: any) => `translate(${nodelink.x},${nodelink.y})`)
			.text('hello')
			.each((nodelink: any) => mountToEdge(nodelink));

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
			.attr(
				'viewBox',
				`-${window.screen.height / 2} -${window.screen.width / 2} ${window.screen.height} ${window.screen.width}`
			)
			.attr('id', 'graph')
			.attr('preserveAspectRatio', 'xMidYMid meet') // Centers content
			.attr('style', 'max-width: 100%; height: auto;');

		// Create groups for links and nodes
		let vp = svg.append('g');
		vp.append('g').attr('class', 'links').attr('stroke', '#999').attr('stroke-opacity', 0.6);
		vp.append('g').attr('class', 'nodes').attr('stroke', '#fff').attr('stroke-width', 1.5);
		vp.append('g').attr('class', 'nodelinks').attr('stroke', '#fff').attr('stroke-width', 1.5);

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
			.force('charge', d3.forceManyBody().strength(-10_000))
			.force('collide', d3.forceCollide(card_size))
			.force('x', d3.forceX().strength(0.3))
			.force('y', d3.forceY().strength(0.3))
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
	let myZoom = d3.zoom().scaleExtent([0.5, 4]).on('zoom', handleZoom);

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

<div bind:this={chartContainer}></div>

<style>
	div {
		display: flex;
		justify-content: center;
		position: fixed;
		width: 100%;
		height: 100vh; /* Viewport height */
	}
</style>
