import { getAds } from './api';
import { toAdData } from './model';

const connect = (endpoint) => getAds(endpoint).map((json) => json.map(toAdData));

export default connect;
