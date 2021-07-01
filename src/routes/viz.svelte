<script lang="ts">
	import { onMount } from 'svelte';
  import roughViz from 'rough-viz/dist/rough-viz.min.js';

	onMount(() => {
		new roughViz.Bar({
			element: '#viz',
   		data: {labels: ['a', 'b'], values: [10, 20]}
		});
	});
</script>

<h1>Visualization | Charts</h1>

<div id="viz"></div>
