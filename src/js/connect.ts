/*import axios from 'axios';*/

import { getAds } from './api';
import { toAdData } from './model';

/*const connect = async () => {
    let locations = [];
    try {
        await axios
            .get(endpoint)
            .then((response) => {
                locations.push(...response.data);
                return locations;
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.error(error);
    }
    return locations;
};*/

const connect = (endpoint) => getAds(endpoint).map((json) => json.map(toAdData));

export default connect;
