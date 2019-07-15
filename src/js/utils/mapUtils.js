export const getMarkers = (geocoder, data, resultsMap, icon) => {
  let bounds = new google.maps.LatLngBounds();
  let markerCount = 0;
  let markerArr = [];
  let matchedMarkerArr = [];

  data.map((item, index) => {
    const loc = item["loc"];
    //setTimeout due to google maps limit of concurrect geocoding processes
    setTimeout(() => {
      geocoder.geocode({ address: loc }, (results, status) => {
        if (status === "OK") {
          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: resultsMap,
            icon: icon
          });

          markerArr.push(marker);
          matchedMarkerArr.push({ id: item["id"], marker: marker });

          const infowindow = new google.maps.InfoWindow({
            content: createInfoWindow(item),
            maxWidth: 200
          });

          marker.addListener("click", function() {
            infowindow.open(marker.get("resultsMap"), marker);
          });

          //extend the bounds by the newly geocoded marker
          bounds.extend(marker.position);
          markerCount += 1;

          //if all markers are iterated over fit boundries of the map
          if (markerCount === data.length) {
            resultsMap.fitBounds(bounds);
          }
        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    }, index * 500);
  });
  return [markerArr, matchedMarkerArr];
};

//hide all markers
export const setNullOnAllMarkers = markers => {
  markers.map(marker => marker.setMap(null));
};

//show all markers on the provided map
export const setMapOnMarkers = (markers, map) => {
  markers.map(marker => marker.setMap(map));
};

//infodata content on marker click
export const createInfoWindow = item => {
  let html = [];

  html.push("<div>");
  Object.keys(item).map(key => {
    if (key !== "url" && key !== "id") {
      html.push(`<p>${item[key]}</p>`);
    } else if (key === "id") {
      html.push(
        `<p><a href="${item["url"]}" target="_blank">Id: ${item["id"]}</a></p>`
      );
    } else if (key === "loc") {
      html.push(`<p style="text-transform: capitalize;">${item[key]}</p>`);
    }
  });
  html.push("</div>");

  return html.join("\r\n");
};
