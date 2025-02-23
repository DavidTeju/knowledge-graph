<script lang="ts">
	import { Dialog, Label, Separator } from 'bits-ui';
	let { content } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="rounded-input  shadow-mini inline-flex
		h-72 items-center justify-center bg-sky-100 px-[21px]
		text-[15px] font-semibold  text-sky-900 transition-colors hover:bg-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-50 focus-visible:outline-hidden active:scale-[0.98]"
	>
		<h1 class="text-2xl">
			{content}
		</h1>
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60"
		/>
		<Dialog.Content
			class="rounded-card-lg shadow-popover <!--  Soft gray background --> data-[state=open]:animate-in
			data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border bg-gray-50 p-5 outline-hidden sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
			>
				READ Content
			</Dialog.Title>
			<Separator.Root class="-mx-5 mt-5 mb-6 block h-px bg-gray-200" />
			<!-- Softer separator -->
			<Dialog.Description class="text-sm text-gray-600">
				<!-- Muted text -->
				{content}
			</Dialog.Description>
			<Dialog.Close
				class="<!-- Consistent  focus rings --> absolute top-5
				right-5 rounded-md focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-50 focus-visible:outline-hidden active:scale-[0.98]"
			>
				<div>
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
