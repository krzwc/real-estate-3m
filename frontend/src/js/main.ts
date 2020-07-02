import '../css/main.css';
import connect from './connect';
import { compose } from 'ramda';
import endpoint from './utils/endpoint';
import mapboxgl from 'mapbox-gl';
import { displayData } from "./utils/panelUtils";

//map imports
import myMap from './components/map';

//panel imports
import { matchAndDisplayLocations } from './utils/panelUtils';

//app state
// let map; // google map api data
let markerArr = []; // array of all markers
let matchedMarkerArr = []; // array of all markers based on matched locations

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const addEventListeners = (locations) => {
    searchInput.addEventListener('keyup', (e) =>
        matchAndDisplayLocations(locations, e, matchedMarkerArr, map, suggestions),
    );
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });

    return locations
};

mapboxgl.accessToken = 'ONpvAwYP2JiHDEIAbqXx';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'https://api.maptiler.com/maps/dbbf53d1-09f9-456b-bd9b-c354829441ed/style.json?key=ONpvAwYP2JiHDEIAbqXx',
    center: [18.638306, 54.372158], // starting position
    zoom: 12 // starting zoom
})

//resolve all locations and then apply them to the map
const mapsCallback = () => {
    connect(endpoint).fork(
        console.error,
        compose(
            /*(locations) => ([map, markerArr, matchedMarkerArr] = myMap(locations, suggestions)),*/
            (locations) => {
                locations.forEach((loc) => {
                    const el = document.createElement('div');
                    el.className = 'marker';

                    new mapboxgl.Marker(el)
                        .setLngLat([loc.lon, loc.lat])
                        .addTo(map);
                    });
            },
            (locations) => {
                suggestions.innerHTML = displayData(locations)

                return locations
            },
            addEventListeners
        ),
    );
};

mapsCallback();



