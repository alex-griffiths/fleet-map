<script>
	import AssetList from '$lib/AssetList/AssetList.svelte';
	import Map from '$lib/Map.svelte';
	import { JsonView } from '@zerodevx/svelte-json-view';
	export let data;

	const json = data.feeds;
</script>

<div class="map">
	<Map feeds={data.feeds} />
</div>

<AssetList assets={data.assets} />

<div class="debug">
	<div>
		<h2>Incidents</h2>
		<span>RFS NSW</span>
	</div>
	<JsonView {json} />
</div>

<style>
	.map {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}

	.debug {
		max-width: 45vw;
		position: fixed;
		bottom: 0;
		overflow-y: auto;
		max-height: 30vh;
		background-color: white;
	}

	.debug > div {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.debug h2 {
		font-weight: 700;
	}

	.debug > div > span {
		font-size: 0.6rem;
		font-weight: 400;
		letter-spacing: 0.07em;
	}
</style>
