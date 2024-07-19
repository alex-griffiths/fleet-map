<script lang="ts">
	import { type Asset } from '$lib/AssetList';
	import AssetCard from '$lib/AssetList/AssetCard.svelte';

	export let assets: Asset[];
</script>

<div class="asset-list fixed top-0 m-2">
	<h2>Assets</h2>
	<div class="flex flex-col space-y-5">
		{#each assets as asset}
			<AssetCard {asset} />
		{/each}
	</div>
</div>

<style>
</style>
