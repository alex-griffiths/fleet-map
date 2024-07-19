<script lang="ts">
	import type { FeatureCollection } from 'geojson';
	import mapboxgl, { Map, Popup } from 'mapbox-gl';
	import { onMount } from 'svelte';

	type IncidentFeed = {
		name: string;
		id: string;
		enabled: boolean;
		incidents: FeatureCollection;
	};

	export let feeds: IncidentFeed[];

	let map;
	mapboxgl.accessToken =
		'pk.eyJ1IjoiYWxleC1ncmlmZml0aHMiLCJhIjoiY2xvOGVkc3JoMDBhOTJscDNhbmRiYTA2NiJ9.PFm_Jme8SwBYjk1875HFpQ';

	onMount(() => {
		map = new Map({
			bounds: [
				[153.61194, -12.46113],
				[113.6594, -43.00311]
			],
			container: 'map',
			style: 'mapbox://styles/mapbox/light-v10',
			center: [150.961483, -33.750512],
			zoom: 9,
			attributionControle: true,
			logoPosition: 'bottom-right'
		});

		map.on('load', () => {
			feeds.forEach((feed) => {
				if (!feed.enabled) {
					return;
				}

				map.addSource(`incidents-${feed.id}`, {
					type: 'geojson',
					data: feed.incidents
				});
				map.addLayer({
					id: `incidents-fill-${feed.id}`,
					type: 'fill',
					source: `incidents-${feed.id}`,
					layout: {},
					paint: {
						'fill-color': '#ff3300',
						'fill-opacity': 0.2
					}
				});
				map.addLayer({
					id: `incidents-outline-${feed.id}`,
					type: 'line',
					source: `incidents-${feed.id}`,
					layout: {},
					paint: {
						'line-color': '#ff3300',
						'line-width': 1
					}
				});

				map.on('click', `incidents-fill-${feed.id}`, (e) => {
					const html = `
                        <h1>${feed.name}</h1>
                        <div>
                            ${e.features[0].properties.description}
                        </div>
                    `;
					new Popup().setLngLat(e.lngLat).setHTML(html).addTo(map);
					console.log(e.features);
				});

				map.on('mouseover', `incidents-fill-${feed.id}`, (e) => {
					map.getCanvas().style.cursor = 'pointer';
				});
				map.on('mouseleave', `incidents-fill-${feed.id}`, (e) => {
					map.getCanvas().style.cursor = '';
				});
			});
		});
	});
</script>

<div id="map" />

<style>
	#map {
		width: 100vw;
		height: 100vh;
	}
</style>
