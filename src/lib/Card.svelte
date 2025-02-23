<script lang="ts">
	import { graph } from '$lib/graphState.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import ContentView from './ContentView.svelte';
	import { Dialog, Separator, Tooltip } from 'bits-ui';
	import MagicWand from 'phosphor-svelte/lib/MagicWand';

	let { nodeId, size, nodeDescription } = $props();
	// id ;
	let count = $state(0);

	console.log(nodeDescription);
	const onClick = () => {
		// console.log(graph.nodeMap);
		console.log(graph);
		const edge = graph.nodeMap.get(nodeId)!.createEdge(count.toString(), 'is count of');
		graph.nodeMap.set(edge.target.id, edge.target);
		// console.log(graph.nodeMap);
		graph.nodeMap = new SvelteMap(graph.nodeMap);
		count++;
	};
</script>

<foreignObject
	width={size}
	height={size}
	transform="translate(-{size / 2},-{size / 2})"
	class="grid"
>
	<div
		class="card shadow-popover relative top-4 grid h-10/12
    w-10/12
place-items-center place-self-center
rounded-2xl
bg-amber-200
    "
	>
		<Tooltip.Provider>
			<Tooltip.Root delayDuration={200}>
				<Tooltip.Trigger
					onclick={onClick}
					class="
          shadow-mini
absolute -top-4 -right-4 z-10
          inline-flex size-24  items-center justify-center
        rounded-full border border-gray-300
        bg-amber-50 ring-amber-300 ring-offset-amber-50 transition-colors hover:bg-amber-100 focus-visible:ring-2
        focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 focus-visible:outline-hidden"
				>
					<MagicWand class="size-5 text-amber-600" />
				</Tooltip.Trigger>
				<Tooltip.Content
					sideOffset={8}
					class="rounded-card-sm shadow-popover border-gray-300 bg-white"
				>
					<div class="flex items-center justify-center p-3 text-sm font-semibold text-amber-900">
						Learn More!
						<Tooltip.Arrow class="fill-white [&>path:first-of-type]:stroke-gray-300" />
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>

		<ContentView id={nodeId} content={nodeDescription} />
	</div>
</foreignObject>
