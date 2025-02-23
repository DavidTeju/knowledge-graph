<script lang="ts">
	import { Dialog, Separator } from 'bits-ui';
	let { node } = $props();
	let data_entries = Object.entries(node.data);

	console.log(data_entries);

	function capitalizeFirstLetter(val: string) {
		return String(val).charAt(0).toUpperCase() + String(val).slice(1);
	}
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="
    flex
		h-11/12 
    w-11/12
    rounded-md
    text-left
		font-semibold  text-teal-700 transition-colors focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 focus-visible:outline-hidden active:scale-[0.98]"
	>
		<div class=" top-0 container">
			<h1 class="text-2xl">
				{node.id.toUpperCase()}
			</h1>
			<Separator.Root class="z-10 -mx-5 mt-8 mb-6 block h-px bg-pink-400" />
			<!-- <button class="btn"> -->
			<!--   Inbox -->
			<!-- <div class="badge badge-secondary">+99</div> -->
			<!-- </button> -->
			<p>
				{node.description}
			</p>
		</div>
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60"
		/>
		<Dialog.Content
			class="rounded-card-lg shadow-popover data-[state=open]:animate-in
			data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border bg-gray-50 p-5 outline-hidden sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title class="  w-full  text-lg font-semibold tracking-tight text-teal-700">
				{node.id.toUpperCase()}
			</Dialog.Title>
			<Separator.Root class="-mx-5 mt-5 mb-3 block h-px bg-pink-400" />
			<Dialog.Description class="text-sm text-gray-600">
				<div class="row flex justify-center">
					{#each node.identifiers as ident}
						<button class="m-2 rounded bg-teal-700 p-1 text-white">
							{capitalizeFirstLetter(ident)}
						</button>
					{/each}
				</div>
				{node.description}
				<div class="mt-8 flex flex-col">
					<h1 class="text-lg font-semibold text-pink-400">Facts Sheet</h1>
					{#each data_entries as [key, value]}
						<span class="flex">
							{capitalizeFirstLetter(key)}:{value}
						</span>
					{/each}
				</div>
			</Dialog.Description>
			<Dialog.Close
				class="<!-- Consistent  focus rings --> absolute top-5
				right-5 rounded-md focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 focus-visible:outline-hidden active:scale-[0.98]"
			>
				<div>
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
