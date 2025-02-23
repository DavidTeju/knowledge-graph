<script lang="ts">
	let { id, size } = $props();
	let count = $state(0);
</script>

<foreignObject
	width={size}
	height={size}
	transform="translate(-{size/2},-{size/2})"
	class="place-content-between rounded-2xl bg-teal-500 p-2"
	><div class="card">
		<div class="card bg-primary text-primary-content w-96 text-wrap">
			<div class="card-body">
				<h2 class="card-title">Card title!</h2>
				<p>If a dog chews shoes whose shoes does he choose?</p>
				<div class="card-actions justify-end">
					<button class="btn">Buy Now</button>
				</div>
			</div>
		</div>
		<!-- <button -->
		<!-- 	class="rounded bg-blue-500 p-5 font-bold text-white hover:bg-blue-700" -->
		<!-- 	onclick={() => count++} -->
		<!-- > -->
		<!-- 	{id}: {count} -->
		<!-- </button> -->
	</div></foreignObject
>
