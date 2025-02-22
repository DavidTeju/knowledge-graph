
<style>
  div {
    display: flex;
    justify-content: center;
  }

  .node circle {
    stroke: #fff;
    stroke-width: 1.5px;
  }

  .node text {
    font-size: 12px;
    fill: #000;
    z-index: 4; /* or any integer value */
  }
</style>

<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";

  export let data;

  let chartContainer;
  let simulation;
  let link;
  let node;

  // Reactive block to update graph when data changes
  $: if (simulation && data) {
    updateGraph();
  }

  function updateGraph() {
    // Update nodes and links
    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links);

    // Update link elements
    link = d3
      .select(chartContainer)
      .select("svg")
      .select("g.links")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.size));

    // Update node elements (grouping circle and label)
    node = d3
      .select(chartContainer)
      .select("svg")
      .select("g.nodes")
      .selectAll(".node") // Select the group elements
      .data(data.nodes)
      .join("g") // Create group elements for each node
        .attr("class", "node") // Add a class for styling
        .call(
          d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );


    // Add circles to the node groups
    node.selectAll("circle") // Select existing circles (if any)
      .data(d => [d]) // One circle per group
      .join("circle")
        .attr("r", (d) => d.size)
        .attr("fill", (d) => d.color);



    // Add labels to the node groups
    node.selectAll("text") // Select existing text (if any)
      .data(d => [d]) // One text per group
      .join("text")
        .text(d => d.id) // Display the node ID
        .attr("dy", d => d.size + 12) // Position below the circle
        .attr("stroke", "red")

    // Restart simulation
    simulation.alpha(1).restart();
  }

  onMount(() => {
    const width = 928;
    const height = 680;

    // Create initial SVG container
    const svg = d3
      .select(chartContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Create groups for links and nodes
    svg.append("g").attr("class", "links").attr("stroke", "#999").attr("stroke-opacity", 0.6);
    svg.append("g").attr("class", "nodes").attr("stroke", "#fff").attr("stroke-width", 1.5);

    // Initialize simulation
    simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id((d) => d.id).distance((d) => d.distance)
      )
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", () => {
        // Update positions on each tick
        link
          ?.attr("x1", (d) => d.source.x)
          ?.attr("y1", (d) => d.source.y)
          ?.attr("x2", (d) => d.target.x)
          ?.attr("y2", (d) => d.target.y);

        // Update node positions (move the group element)
        node?.attr("transform", d => `translate(${d.x},${d.y})`);
      });

      if (data) {
          updateGraph(); // Initial graph render with labels on mount if data is available
      }
  });

  // Drag event handlers
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
</script>

<div bind:this={chartContainer}></div>

