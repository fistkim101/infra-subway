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
const USERNAME = 'fistkim101@gmail.com';
const PASSWORD = '12qw';

export default () => {

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