<section class="min-h-screen">
	<div class="container mx-auto flex flex-col items-center px-4 py-20 md:flex-row">
		<!-- Text Content -->
		<div class="mb-10 md:mb-0 md:w-1/2">
			<h1
				class="mb-6 bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-5xl font-bold text-transparent"
			>
				Visualize Your Knowledge Connections
			</h1>
			<p class="mb-8 text-xl text-gray-600">
				Note Graph transforms document relationships into interactive maps using AI-powered
				analysis.
			</p>
			<div class="flex gap-4">
				<button
					onclick={() => (window.location.href = '/')}
					class="rounded-lg bg-amber-600 px-8 py-3 text-white transition hover:bg-amber-700"
				>
					Get Started Free
				</button>
				<button
					class="rounded-lg border-2 border-teal-600 px-8 py-3 text-teal-600 transition hover:bg-teal-50"
				>
					Watch Demo
				</button>
			</div>
		</div>

		<!-- Interactive Preview -->
		<div class="relative md:w-1/2" style="height: 500px">
			<div
				class="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300 to-amber-100 shadow-lg"
			>
				<!-- Graph visualization placeholder -->
				<!-- <div class="note-graph-preview" use:noteGraphBindings /> -->
			</div>
		</div>
	</div>
</section>
