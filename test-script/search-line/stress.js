import http from 'k6/http';
import {check} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 20},
        {duration: '10s', target: 20},
        {duration: '5s', target: 30},
        {duration: '10s', target: 30},
        {duration: '5s', target: 50},
        {duration: '10s', target: 50},
        {duration: '5s', target: 0},
    ],
};

const BASE_URL = 'https://fistkim.kro.kr';

export default () => {

    // lending page
    let homeUrl = `${BASE_URL}`;
    let lendingPageResponse = http.get(homeUrl);
    check(lendingPageResponse, {
        'lending page running': (response) => response.status === 200
    });

    // Yangjae search line
    let YangjaeSearchLineUrl = `${BASE_URL}/paths/?source=1&target=2`;
    let YangjaeSearchLineResponse = http.get(YangjaeSearchLineUrl);
    check(YangjaeSearchLineResponse, {
        'Yangjae line searching success': (response) => response.status === 200
    });

    // Gyodae search line
    let GyodaeSearchLineUrl = `${BASE_URL}/paths/?source=3&target=2`;
    let GyodaeSearchLineResponse = http.get(GyodaeSearchLineUrl);
    check(GyodaeSearchLineResponse, {
        'Gyodae line searching success': (response) => response.status === 200
    });

    // South-Terminal search line
    let SouthTerminalSearchLineUrl = `${BASE_URL}/paths/?source=4&target=2`;
    let SouthTerminalSearchLineResponse = http.get(SouthTerminalSearchLineUrl);
    check(SouthTerminalSearchLineResponse, {
        'South-Terminal line searching success': (response) => response.status === 200
    });

};