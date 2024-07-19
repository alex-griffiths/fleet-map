<script lang="ts">
	import { type Asset } from '.';

	export let asset: Asset;
</script>

<div class="asset-card bg-blue-500 rounded-md p-2 w-[300px] text-white">
	<h3 class="text-lg font-semibold">{asset.name}</h3>
	<p>{asset.name}</p>
</div>

<style>
</style>
