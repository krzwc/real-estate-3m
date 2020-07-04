import '../css/main.css';
import connect from './connect';
import { compose } from 'ramda';
import endpoint from './utils/endpoint';
import mapboxgl from 'mapbox-gl';
import { displayData, mapArrayToHtml, filterLocations, mapToMarkers } from "./utils/panelUtils";
import { HTMLElementEvent, AdDataResponse } from './interfaces'

mapboxgl.accessToken = 'ONpvAwYP2JiHDEIAbqXx';

class App {

    private map: mapboxgl.Map;
    private searchInput: HTMLInputElement;
    private suggestions: HTMLUListElement;

    constructor() {
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'https://api.maptiler.com/maps/dbbf53d1-09f9-456b-bd9b-c354829441ed/style.json?key=ONpvAwYP2JiHDEIAbqXx',
            center: [18.638306, 54.372158], // starting position
            zoom: 12 // starting zoom
        });

        this.searchInput = document.querySelector('.search');
        this.suggestions = document.querySelector('.suggestions');
    }

    public run = () => connect(endpoint).fork(
        console.error,
        compose(
            (locations) => {
                this.searchInput.addEventListener('keyup', ({ target: { value: inputValue }}: HTMLElementEvent<HTMLInputElement>) => {
                    const matchArray = filterLocations(inputValue, locations);
                    this.suggestions.innerHTML = mapArrayToHtml(matchArray, inputValue);

                    document.querySelectorAll('.marker').forEach((marker) => marker.remove());

                    mapToMarkers(matchArray, this.map);
                })},
            (locations: AdDataResponse) => {
                this.suggestions.innerHTML = displayData(locations);

                mapToMarkers(locations, this.map);

                return locations
            }
        )
    )
};

const app = new App();
app.run();



