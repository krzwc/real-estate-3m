//not testing any Google Maps Api
import { createInfoWindow } from '../utils/mapUtils'

const item = {
    "id": "62386593",
    "url": "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/rewelacyjna-lokalizacja-gotowe-do-zamieszkania-ogl62386593.html",
    "loc": "gdańsk wrzeszcz stanisława wyspiańskiego",
    "price": "Cena: 349 000 zł( 7 426 zł/m2 )",
    "rooms": "3 pok.",
    "m2": "47 m2",
    "floor": "2 piętro"
  }

test('infoWindowData works correctly', () => {
    const result = createInfoWindow(item)
    expect(result).toMatch(`<div>\r\n<p><a href=\"https://dom.trojmiasto.pl/`);
  })
