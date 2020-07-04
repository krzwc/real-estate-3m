import { getAds } from './api';
import { toAdData } from './model';
import { AdDataResponse } from './interfaces';

const connect = (endpoint: string) => getAds(endpoint).map((json: AdDataResponse) => json.map(toAdData));

export default connect;
