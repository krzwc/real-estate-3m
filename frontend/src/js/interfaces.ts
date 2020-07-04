type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
}

type AdDataType = {
    id: string,
    url: string,
    loc: string,
    price: string,
    rooms: string,
    m2: string,
    floor: string,
    lon: number,
    lat: number
}

type AdDataResponse = AdDataType[];

export { HTMLElementEvent, AdDataType, AdDataResponse }
