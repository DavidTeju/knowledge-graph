<script>
  import Chart from './../Chart.svelte';

  const data = {
    nodes: [
      { id: "A", group: 1, size: 14, color: "#5B85AA"},
      { id: "B", group: 1, size: 8, color: "#5B85AA"},
      { id: "C", group: 2, size: 8, color: "#F46036"}
    ],
    links: [
      { source: "A", target: "B", distance: 100, size: 3, relation: "color"},
      { source: "B", target: "C", distance: 200, size: 2, relation: "size"}
    ]
  };
</script>

<Chart {data} />

  <!-- <text x="5" y="30" fill="none" stroke="red" font-size="35">I love SVG!</text> -->
