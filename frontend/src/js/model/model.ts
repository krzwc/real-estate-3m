import { compose, join, map } from 'ramda';
import { upperFirst, words } from "lodash-es";

// data type
const AdData = (id, url, loc, price, rooms, m2, floor, lon, lat) => ({
    id,
    url,
    loc,
    price,
    rooms,
    m2,
    floor,
    lon,
    lat
});

// constructor
const toAdData = ({ id, url, loc, price, rooms, m2, floor, lon, lat }) =>
    AdData(
        id,
        url,
        compose(
            join(" "),
            map(upperFirst),
            words
        )(loc),
        price,
        rooms,
        m2,
        floor,
        lon,
        lat
    );

export { toAdData }
