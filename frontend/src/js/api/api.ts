import { Task, func } from '../types';
import { toAdData } from '../model';
import { AdDataResponse } from '../interfaces';

const toJSON = (response: Response) => response.json();

const fetchIt = (url: string) => Task((rej: func, res: func) => fetch(url).then(toJSON).then(res).catch(rej));

const RealEstate3m = {
    getAds: fetchIt,
};

const getAds = (url: string) => RealEstate3m.getAds(url).map((json: AdDataResponse) => json.map(toAdData));

export { RealEstate3m, getAds };
