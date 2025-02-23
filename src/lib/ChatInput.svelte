<script lang="ts">
	import type { Node } from './chart_types';

	let inputValue = $state('');
	let count = $state(0);

	interface Props {
		placeholder?: string;
		nodes?: Node[];
	}

	let { placeholder = 'Type a message...', nodes = $bindable() }: Props = $props();
	function handleSend() {
		count++;
		if (inputValue.trim()) {
			nodes?.push({ id: count.toString(), content: inputValue });
			inputValue = '';
		}
	}
</script>

<div
	class="fixed bottom-0 left-0 z-50 w-full rounded-t-lg border-t border-gray-200 bg-white p-4 shadow-lg"
>
	<div class="mx-auto flex max-w-2xl items-center gap-2">
		<input
			type="text"
			bind:value={inputValue}
			onkeydown={(e) => e.key === 'Enter' && handleSend()}
			{placeholder}
			class="flex-1 rounded-full border border-gray-300 p-3 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>

		<button
			onclick={handleSend}
			aria-label="chatinput"
			class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
				/>
			</svg>
		</button>
	</div>
</div>
