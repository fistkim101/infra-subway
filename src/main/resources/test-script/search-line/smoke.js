import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
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

    // search line
    let searchLineUrl = `${BASE_URL}/paths/?source=1&target=2`;
    let searchLineResponse = http.get(searchLineUrl);
    check(searchLineResponse, {
        'line searching success': (response) => response.status === 200
    });

    sleep(1);
};