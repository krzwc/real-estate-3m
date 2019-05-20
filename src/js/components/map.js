import { getMarkers } from "../utils/mapUtils";
import { displayData } from "../utils/panelUtils";
import { mapStyle } from "../utils/mapStyle";

const myMap = (locations, suggestions) => {
  let mapProp = {
    center: new google.maps.LatLng(54.372158, 18.638306),
    zoom: 12,
    mapTypeControl: false,
    styles: mapStyle
  };

  let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  let geocoder = new google.maps.Geocoder();

  let icon = {
    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
    fillColor: "#FF0000",
    anchor: new google.maps.Point(0, 0),
    fillOpacity: 0.6,
    strokeWeight: 0,
    scale: 1
  };

  let markerArr, matchedMarkerArr;

  suggestions.innerHTML = displayData(locations);
  [markerArr, matchedMarkerArr] = getMarkers(geocoder, locations, map, icon);

  return [map, markerArr, matchedMarkerArr];
};

export default myMap;
