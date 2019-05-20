import axios from "axios"
import connect from '../connect'

jest.mock('axios');

const resp = {
  "data": [
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
}

test('connect works correctly', async () => {
    axios.get.mockResolvedValue(resp)

    let locations = await connect()

    return expect(locations).toEqual(resp.data)
   }
  );



