import { mapArrayToHtml, matchKeywordAndChangeBackground, generateHtml, displayData, filterMarkerPropeties, filterMarkers, filterLocations } from '../utils/panelUtils' 

const item = {
    "id": "62386593",
    "url": "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/rewelacyjna-lokalizacja-gotowe-do-zamieszkania-ogl62386593.html",
    "loc": "gdańsk wrzeszcz stanisława wyspiańskiego",
    "price": "Cena: 349 000 zł( 7 426 zł/m2 )",
    "rooms": "3 pok.",
    "m2": "47 m2",
    "floor": "2 piętro"
  }

const data = [
  {
    "id": "62428125",
    "url": "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/gdansk-wrzeszcz-tadeusza-kosciuszki-43-m2-ogl62428125.html",
    "loc": "gda\u0144sk wrzeszcz tadeusza ko\u015bciuszki",
    "price": "Cena: 345 000 z\u0142( 8 023 z\u0142/m2 )",
    "rooms": "2 pok.",
    "m2": "43 m2",
    "floor": "1 pi\u0119tro"
  },
  {
    "id": "62427854",
    "url": "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/mieszkanie-w-super-lokalizacji-blisko-starowki-ogl62427854.html",
    "loc": "gda\u0144sk d\u0142ugie ogrody siennicka",
    "price": "Cena: 415 000 z\u0142( 8 592 z\u0142/m2 )",
    "rooms": "3 pok.",
    "m2": "48.3 m2",
    "floor": "2 pi\u0119tro"
  }
]

const mMA = [
  {
    id: "62428125",
    marker: "xx"
  },
  {
    id: "62427854",
    marker: "yy"
  }
]

const mA = [
  {
    "id": "62427854",
    "url": "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/mieszkanie-w-super-lokalizacji-blisko-starowki-ogl62427854.html",
    "loc": "gda\u0144sk d\u0142ugie ogrody siennicka",
    "price": "Cena: 415 000 z\u0142( 8 592 z\u0142/m2 )",
    "rooms": "3 pok.",
    "m2": "48.3 m2",
    "floor": "2 pi\u0119tro"
  }
]

test('mapArrayToHtml works correctly', () => {
  let text = mapArrayToHtml(mA, 'wys')
  expect(text).toMatch("")
  text = mapArrayToHtml(mA, 'sie')
  expect(text).toMatch(`<li>\r\n<span class="location"><a href="https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/mieszkanie-w-super-lokalizacji-blisko-starowki-ogl62427854.html" target="_blank">gdańsk długie ogrody <span class=\"hl\">sie</span>nnicka</a></span>\r\n<span class="price">48.3 m2, Cena: 415 000 zł( 8 592 zł/m2 )</span>\r\n</li>`)
})

test('matchKeywordAndChangeBackground works correctly', () => {
  let text = matchKeywordAndChangeBackground(item, 'wys')
  expect(text).toMatch(`gdańsk wrzeszcz stanisława <span class="hl">wys</span>piańskiego`)
  text = matchKeywordAndChangeBackground(item, 'wyss')
  expect(text).toMatch("")
})

test('generateHtml function works without locWithSelection', () => {
  let array = []
  generateHtml(array, item)
  expect(array).toContain('<li>');
  expect(array).toContain('<span class="location"><a href="https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/rewelacyjna-lokalizacja-gotowe-do-zamieszkania-ogl62386593.html" target="_blank">gdańsk wrzeszcz stanisława wyspiańskiego</a></span>');
  expect(array).toContain('<span class="price">47 m2, Cena: 349 000 zł( 7 426 zł/m2 )</span>');
})

test('generateHtml function works with locWithSelection', () => {
  let array = []
  generateHtml(array, item, 'wrzeszcz')
  expect(array).toContain('<li>');
  expect(array).toContain('<span class="location"><a href="https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/rewelacyjna-lokalizacja-gotowe-do-zamieszkania-ogl62386593.html" target="_blank">wrzeszcz</a></span>');
  expect(array).toContain('<span class="price">47 m2, Cena: 349 000 zł( 7 426 zł/m2 )</span>');
})

test('displayData joins html correctly', () => {
  const html = displayData(data)
  expect(html).toMatch(`<li>\r\n<span class=\"location\">`)
})

test('filterMarkerPropeties works correctly', () => {
  const result = filterMarkerPropeties(mMA)
  expect(result).toContain('yy');
  expect(result).not.toContain('62427854');
})

test('filterMarkers works correctly', () => {
  const result = filterMarkers(mMA, mA)
  expect(result).toEqual([{"id": "62427854", "marker": "yy"}])
  expect(result).not.toEqual([{"id": "62428125", "marker": "xx"}])
})

test('filterLocations works correctly', () => {
  let result = filterLocations('sie', data)
  expect(result).toEqual([{"floor": "2 piętro", "id": "62427854", "loc": "gdańsk długie ogrody siennicka", "m2": "48.3 m2", "price": "Cena: 415 000 zł( 8 592 zł/m2 )", "rooms": "3 pok.", "url": "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/mieszkanie-w-super-lokalizacji-blisko-starowki-ogl62427854.html"}]);
  result = filterLocations('', data)
  expect(result).toEqual([{"floor": "1 piętro", "id": "62428125", "loc": "gdańsk wrzeszcz tadeusza kościuszki", "m2": "43 m2", "price": "Cena: 345 000 zł( 8 023 zł/m2 )", "rooms": "2 pok.", "url": "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/gdansk-wrzeszcz-tadeusza-kosciuszki-43-m2-ogl62428125.html"}, {"floor": "2 piętro", "id": "62427854", "loc": "gdańsk długie ogrody siennicka", "m2": "48.3 m2", "price": "Cena: 415 000 zł( 8 592 zł/m2 )", "rooms": "3 pok.", "url": "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/mieszkanie-w-super-lokalizacji-blisko-starowki-ogl62427854.html"}])
  result = filterLocations('naondeioaned', data)
  expect(result).toEqual([])
})