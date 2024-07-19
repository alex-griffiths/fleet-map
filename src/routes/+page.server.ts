import type { Asset } from "$lib/AssetList";
import type { FeatureCollection } from "geojson";

export type IncidentFeed = {
    id: string
    name: string,
    enabled: boolean
    incidents: FeatureCollection
};
export async function load() {
    const feeds: IncidentFeed[] = [
        {
            id: "NSW-RFS",
            name: "NSW RFS",
            enabled: true,
            incidents: await (await fetch("http://www.rfs.nsw.gov.au/feeds/majorIncidents.json")).json()
        },
        {
            id: "QLD-EFS",
            name: "QLD EFS",
            enabled: true,
            incidents: await (await fetch("https://publiccontent-gis-psba-qld-gov-au.s3.amazonaws.com/content/Feeds/BushfireCurrentIncidents/bushfireAlert.json")).json()
        }
    ];

    const assets: Asset[] = [
        {
            name: "ParkAir 1"
        },
        {
            name: "ParkAir 2"
        }
    ];

    return { feeds, assets };

}
