import { Task } from '../types';
import { toAdData } from '../model';

const toJSON = (response) => response.json();

const fetchIt = (url) => Task((rej, res) => fetch(url).then(toJSON).then(res).catch(rej));

const RealEstate3m = {
    getAds: fetchIt,
};

const getAds = (url) => RealEstate3m.getAds(url).map((json) => json.map(toAdData));

export { RealEstate3m, getAds };
