import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1,
    duration: '1s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://fistkim.kro.kr';
// const BASE_URL = 'http://localhost:8080';

export default () => {

    // lending page
    let homeUrl = `${BASE_URL}`;
    let lendingPageResponse = http.get(homeUrl);
    check(lendingPageResponse, {
        'lending page running': (response) => response.status === 200
    });
};