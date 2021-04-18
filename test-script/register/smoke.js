import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 10,
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

    // register account
    let registerAccountUrl = `${BASE_URL}/members`;
    let randomId = `testId${Math.random().toString().split('.')[1]}`;
    let registerAccountPayload = JSON.stringify({
        email: randomId,
        age: "20",
        password: "12qw",
    });
    let registerAccountParams = {
        headers: {
            'Authorization': `Bearer ${loginResponse.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    let createLinesResponse = http.post(registerAccountUrl, registerAccountPayload, registerAccountParams);
    check(createLinesResponse, {
        'account created successfully': (response) => response.status === 201,
    });
};