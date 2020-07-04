import mapboxgl from "mapbox-gl";

export const mapToMarkers = (locationArr, map) => locationArr.map((loc) => {
  const el = document.createElement('div');
  el.className = 'marker';

  return new mapboxgl.Marker(el)
          .setLngLat([loc.lon, loc.lat])
          .addTo(map)
  });

export const mapArrayToHtml = (arr, keyword) => {
  let html = [];
  arr.map(item => {
    const locWithSelection = matchKeywordAndChangeBackground(item, keyword);
    generateHtml(html, item, locWithSelection);
  });
  return html.join("\r\n");
};

export const matchKeywordAndChangeBackground = (obj, keyword) => {
  const regex = new RegExp(keyword, "gi");
  const locWithSelection = obj.loc.replace(
    regex,
    //highlight all matches with coloured background
    `<span class="hl">${keyword}</span>`
  );
  return locWithSelection;
};

export const generateHtml = (html, item, locWithSelection) => {
  html.push("<li>");
  html.push(
    `<span class="location"><a href="${item["url"]}" target="_blank">${
      //ternary operator to make it work with both locWithSelection provided or not
      locWithSelection ? locWithSelection : item["loc"]
    }</a></span>`
  );
  html.push(`<span class="price">${item["m2"]}, ${item["price"]}</span>`);
  html.push("</li>");
};

export const displayData = data => {
  const html = [];
  data.map(item => generateHtml(html, item));
  return html.join("\r\n");
};

//func filtering out all locations but the ones that the regex applies to
export const filterLocations = (wordToMatch, locations) => {
  return locations.filter(location => {
    const regex = new RegExp(wordToMatch, "gi");
    return location.loc.match(regex);
  });
};
