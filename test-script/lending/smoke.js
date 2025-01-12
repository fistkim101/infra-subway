import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 100,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(95)<100'],
    },
};

const BASE_URL = 'https://fistkim.kro.kr';

export default () => {

    // lending page
    let homeUrl = `${BASE_URL}`;
    let lendingPageResponse = http.get(homeUrl);
    check(lendingPageResponse, {
        'lending page running': (response) => response.status === 200
    });
};