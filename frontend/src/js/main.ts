import '../css/main.css';
import connect from './connect';
import { compose } from 'ramda';
import endpoint from './utils/endpoint';

//map imports
import myMap from './components/map';

//panel imports
import { matchAndDisplayLocations } from './utils/panelUtils';

//app state
let map; // google map api data
let markerArr = []; // array of all markers
let matchedMarkerArr = []; // array of all markers based on matched locations

//resolve all locations and then aplly them to the map
let mapsCallback = () => {
    connect(endpoint).fork(
        console.error,
        compose(
            (locations) => ([map, markerArr, matchedMarkerArr] = myMap(locations, suggestions)),
            addEventListeners
        ),
    );
};
window.mapsCallback = mapsCallback;

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


