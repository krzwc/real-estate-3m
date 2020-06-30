import { compose, join, map } from 'ramda';
import { upperFirst, words } from "lodash-es";

// data type
const AdData = (id, url, loc, price, rooms, m2, floor) => ({
    id,
    url,
    loc,
    price,
    rooms,
    m2,
    floor
});

// constructor
const toAdData = ({ id, url, loc, price, rooms, m2, floor }) =>
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
        floor
    );

export { toAdData }
