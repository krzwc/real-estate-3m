import "../css/main.css";
import connect from "./connect";

//map imports
import myMap from "./components/map";

//panel imports
import { matchAndDisplayLocations } from "./utils/panelUtils";

//app state
let map; // google map api data
let markerArr = []; // array of all markers
let matchedMarkerArr = []; // array of all markers based on matched locations
let locations; //REST API data
connect().then(data => {
  locations = [...data];
});

const mapsCallback = () => {
  if (locations) {
    [map, markerArr, matchedMarkerArr] = myMap(locations, suggestions);
  } else {
    //perhaps not resolved yet
    setTimeout(() => {
      [map, markerArr, matchedMarkerArr] = myMap(locations, suggestions);
    }, 1000);
  }
};
window.mapsCallback = mapsCallback;

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("keyup", e =>
  matchAndDisplayLocations(locations, e, matchedMarkerArr, map, suggestions)
);
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
