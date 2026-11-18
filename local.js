// Алхам 5 — локал сервер рүү load тест. /fast болон /slow хоёрыг tag-аар ялгаж хэмжинэ.
//   node server/server.js          (тусдаа терминалд)
//   k6 run local.js
import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:3000';

export const options = {
  vus: 30,
  duration: '30s',
  thresholds: {
    // Tag тус бүрийн sub-metric summary-д гарахын тулд threshold зарласан.
    'http_req_duration{endpoint:fast}': ['p(95)<50'],
    'http_req_duration{endpoint:slow}': ['p(95)<150'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const fast = http.get(`${BASE_URL}/`, { tags: { endpoint: 'fast' } });
  const slow = http.get(`${BASE_URL}/slow`, { tags: { endpoint: 'slow' } });
  check(fast, { 'fast 200': (r) => r.status === 200 });
  check(slow, { 'slow 200': (r) => r.status === 200 });
}
