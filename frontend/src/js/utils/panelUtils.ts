import mapboxgl from "mapbox-gl";
import { compose, join, map, flatten } from 'ramda';
import { AdDataResponse, AdDataType } from '../interfaces';

const mapToMarkers = (locationArr: AdDataResponse, map: mapboxgl.Map) => locationArr.map((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    return new mapboxgl.Marker(el)
        .setLngLat([loc.lon, loc.lat])
        .addTo(map)
});

const mapArrayToHtml = (arr: AdDataResponse, keyword: string): string => compose(
    join(" "),
    flatten,
    map((item: AdDataType) => {
        const locWithSelection = matchKeywordAndChangeBackground(item, keyword);

        return generateHtml(item, locWithSelection);
    })
)(arr);

const matchKeywordAndChangeBackground = (obj: AdDataType, keyword: string): string => {
    const regex = new RegExp(keyword, "gi");

    return obj.loc.replace(
        regex,
        //highlight all matches with coloured background
        `<span class="hl">${keyword}</span>`
    );
};

const generateHtml = (item: AdDataType, searchedStr?: string) => [
    '<li>',
    `<span class="location"><a href="${item["url"]}" target="_blank">${
        //ternary operator to make it work with both locWithSelection provided or not
        searchedStr ? searchedStr : item["loc"]
    }</a></span>`,
    `<span class="price">${item["m2"]}, ${item["price"]}</span>`,
    '</li>'
];

const displayData = (data: AdDataResponse) => compose(
    join(" "),
    flatten,
    map((item: AdDataType) => generateHtml(item))
)(data);

//func filtering out all locations but the ones that the regex applies to
const filterLocations = (wordToMatch: string, locations: AdDataResponse) => locations.filter((location) => {
    const regex = new RegExp(wordToMatch, "gi");

    return location.loc.match(regex);
});

export { mapToMarkers, mapArrayToHtml, matchKeywordAndChangeBackground, generateHtml, displayData, filterLocations }
