import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '10s', target: 200 },
        { duration: '5s', target: 300 },
        { duration: '10s', target: 300 },
        { duration: '5s', target: 0 },
    ],
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