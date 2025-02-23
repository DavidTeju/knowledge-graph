<script lang="ts">

	let { form } = $props();
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
</main>


<style>
    main {
        padding: 10rem;
    }

</style>