import mapboxgl from "mapbox-gl";
import {compose, join, map, flatten} from 'ramda';
import {upperFirst, words} from 'lodash-es';
import {AdDataResponse, AdDataType} from '../interfaces';
import {invokableCompose} from '../model';

const mapToMarkers = (locationArr: AdDataResponse, map: mapboxgl.Map) => locationArr.map((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    return new mapboxgl.Marker(el)
        .setLngLat([loc.lon, loc.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(createPopupContent(loc)))
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

const createPopupContent = compose(
    (str) => '<div>' + str + '</div>',
    (item: AdDataType) => Object.keys(item).map(key => {
        if (key === "id") {
            return `<p><a href="${item["url"]}" target="_blank">Id: ${item["id"]}</a></p>`
        }
        if (key === "url") {
            return
        }
        if (key === "loc") {
            const loc = item["loc"]
            return `<p>${invokableCompose(join(" "), map(upperFirst), words)(loc)}</p>`
        }
        return `<p>${upperFirst(item[key])}</p>`
    }).join('')
);

export {
    mapToMarkers,
    mapArrayToHtml,
    matchKeywordAndChangeBackground,
    generateHtml,
    displayData,
    filterLocations,
    createPopupContent
}
