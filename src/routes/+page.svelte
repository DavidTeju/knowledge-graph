<script lang="ts">
	let { form } = $props();

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

<main>
	<p>Hey</p>
	<form method="POST" action="?/fetchData">
		<input type="text" id="prompt" name="prompt" placeholder="Prompt" value={form?.prompt} required>
		<button type="submit"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 active:transform-translate">
			Default
		</button>
	</form>


	<p>{form?.data}</p>

	<Chart dataprop={data} />
	<ChatInput bind:nodes={data.nodes} />

</main>

<!-- <text x="5" y="30" fill="none" stroke="red" font-size="35">I love SVG!</text> -->


<style>
    main {
        padding: 2rem 10rem;
    }
</style>