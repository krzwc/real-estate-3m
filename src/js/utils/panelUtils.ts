import { setNullOnAllMarkers, setMapOnMarkers } from "./mapUtils";

//func displaying all matches in the location array based on a provided phrase
export const matchAndDisplayLocations = (data, e, mMA, map, suggestions) => {
  const matchArray = filterLocations(e.target.value, data);
  const displayMarkerArr = filterMarkers(mMA, matchArray);
  suggestions.innerHTML = mapArrayToHtml(matchArray, e.target.value);

  setNullOnAllMarkers(filterMarkerPropeties(mMA));
  setMapOnMarkers(filterMarkerPropeties(displayMarkerArr), map);
};

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

export const filterMarkerPropeties = array =>
  array.map(item => {
    return item.marker;
  });

//func filtering out all targetArray indices not present in locationArray
export const filterMarkers = (targetArray, locationArray) => {
  //taking into account only id property
  const locFilter = locationArray.map(item => {
    return item.id;
  });
  return targetArray.filter(item => locFilter.includes(item.id));
};

//func filtering out all locations but the ones that the regex applies to
export const filterLocations = (wordToMatch, locations) => {
  return locations.filter(location => {
    const regex = new RegExp(wordToMatch, "gi");
    return location.loc.match(regex);
  });
};
