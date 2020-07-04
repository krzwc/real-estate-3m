import { compose, join, map } from 'ramda';
import { upperFirst, words } from "lodash-es";
import { AdDataType } from "../interfaces";

const invokableCompose = <any>compose;

// data type
const AdData = (id: string, url: string, loc: string, price: string, rooms: string, m2: string, floor: string, lon: number, lat: number): AdDataType => ({
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
const toAdData = ({id, url, loc, price, rooms, m2, floor, lon, lat}: AdDataType) =>
    AdData(
        id,
        url,
        invokableCompose(
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

export { toAdData, invokableCompose }
