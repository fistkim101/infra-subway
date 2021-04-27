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
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://fistkim.kro.kr';
const USERNAME = 'fistkim101@gmail.com';
const PASSWORD = '12qw';

export default () => {

    // lending page
    let homeUrl = `${BASE_URL}`;
    let lendingPageResponse = http.get(homeUrl);
    check(lendingPageResponse, {
        'lending page running': (response) => response.status === 200
    });

    // login
    let loginUrl = `${BASE_URL}/login/token`;
    let loginPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });
    let loginParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let loginResponse = http.post(loginUrl, loginPayload, loginParams);
    check(loginResponse, {
        'logged in successfully': (response) => response.json('accessToken') !== '',
    });

    // create line
    let createLineUrl = `${BASE_URL}/lines`;
    let lineRandomNumber = Math.random().toString().split('.')[1];
    let createLinePayload = JSON.stringify({
        name: `testLine-${lineRandomNumber}`,
        color: "grey darken-4",
        upStationId: 1,
        downStationId: 2,
        distance: 10,
    });
    let createLineParams = {
        headers: {
            'Authorization': `Bearer ${loginResponse.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    let createLinesResponse = http.post(createLineUrl, createLinePayload, createLineParams);
    check(createLinesResponse, {
        'created Line successfully': (response) => response.status === 201,
    });
};