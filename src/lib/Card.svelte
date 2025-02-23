<script lang="ts">
	import { graph } from '$lib/graphState.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import ContentView from './ContentView.svelte';
	import { enhance } from '$app/forms';
	import { Node } from '$lib/graph_types';
	import { Dialog, Separator, Tooltip } from 'bits-ui';
	import MagicWand from 'phosphor-svelte/lib/MagicWand';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ResearchContext } from '$lib/agents';

	let { nodeId, size, nodeDescription, fixNodeInPlace } = $props();

	const gatherContext = (head: Node): ResearchContext => {
		const adjacencies = head.edges.values().map(e => e.toString()).toArray();
		return {
			mainTopic: head.id,
			identifiers: head.identifiers,
			description: head.description,
			adjacencies
		};
	};

	const onClick = async ({ data }: { data: FormData }) => {
		if (!graph.nodeMap || graph.nodeMap === null) {
			return;
		}

		fixNodeInPlace(nodeId);
		const nodeMap = graph.nodeMap;

		const currentNode = graph.nodeMap.get(nodeId);
		const context = gatherContext(currentNode!);


		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify(context),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result = await response.json();

		if (response.ok) {
			console.log(result);

			const relationships = result['relationships'];
			const identifiers = result['identifiers'];


			currentNode!.identifiers.push(...identifiers);
			currentNode!.description = result['description'];
			for (const rel of relationships) {
				const { target, relationship } = rel;
				const edge = currentNode!.createEdge(target, relationship);
				nodeMap.set(edge.target.id, edge.target);
			}
			graph.nodeMap = new SvelteMap(nodeMap);
		}


	};
</script>

<foreignObject
	width={size}
	height={graph.nodeMap.get(nodeId).description ? size: (size / 3)}
	transform="translate(-{size / 2},-{graph.nodeMap?.get(nodeId)?.description ? (size/2): (size / 3 / 2)})"
	class="grid"
>
	<div
		class="card shadow-popover relative top-4 grid h-10/12
    w-10/12
place-items-center
rounded-2xl
bg-amber-200
    "
	>
		<Tooltip.Provider>
			<Tooltip.Root delayDuration={200}>
				<Tooltip.Trigger
					onclick={onClick}
					class=" shadow-mini absolute -top-4 -right-4 z-10
          inline-flex size-24  items-center justify-center
        rounded-full border-2
          border-pink-400
        bg-amber-50 ring-amber-300 ring-offset-amber-50 transition-colors hover:bg-amber-100 focus-visible:ring-2
        focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 focus-visible:outline-hidden"
				>
					<MagicWand class="size-5 text-amber-600" />
				</Tooltip.Trigger>
			</Tooltip.Root>
		</Tooltip.Provider>
		<ContentView {nodeId} />
	</div>
</foreignObject>
