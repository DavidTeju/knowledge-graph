<script lang="ts">
	import { Dialog, Label, Separator } from 'bits-ui';
	let count = $state(0);

	let inputValue = $state('');

	let placeholder = 'Type a message...';

	function handleSend() {
		count++;
		if (inputValue.trim()) {
			console.log(inputValue);
			inputValue = '';
			// nodes?.push({ id: count.toString(), content: inputValue });
		}
	}
</script>

<Dialog.Root open>
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
				What do you want to learn?
			</Dialog.Title>
			<Separator.Root class="-mx-5 mt-5 mb-6 block h-px bg-gray-200" />
			<div class="flex flex-col items-start gap-1 pt-7 pb-11">
				<div class="relative w-full">
					<form method="POST" action="?/fetchData" class="flex flex-row">
						<textarea
							id="prompt"
							class="textarea textarea-secondary
              h-input rounded-card-sm <!-- White input background --> mx-5 inline-flex
						w-full items-center border border-gray-300
						bg-white px-4 text-base placeholder:text-gray-400/50 hover:border-gray-400 focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-50 focus:outline-hidden sm:text-sm"
							{placeholder}
							name="name"
							onkeydown={(e) => e.key === 'Enter' && handleSend()}
							bind:value={inputValue}
						></textarea>

						<Dialog.Close
							class="h-input rounded-input <!-- Matching  trigger style --> shadow-mini inline-flex
					items-center justify-center bg-sky-100 px-[50px] 
					text-[15px] font-semibold text-sky-900 hover:bg-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-50 focus-visible:outline-hidden active:scale-[0.98]"
						>
							Save
						</Dialog.Close>
					</form>
				</div>
			</div>
			<!-- <div class="flex w-full justify-end"> -->
			<!-- </div> -->
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
