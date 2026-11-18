// Алхам 4 — SLO-г threshold болгон шалгах (stages-гүй!).
// SLO = baseline p95 (5 VU, results/run-05vu.txt: 268.7ms) × 1.5 ≈ 400ms.
//   k6 run thresholds.js                 -> SLO-оор шалгана
//   k6 run -e P95_MS=50 thresholds.js    -> санаатай хатуу -> FAIL
//   k6 run -e BASE_URL=http://127.0.0.1:3000 thresholds.js  -> локал сервер
import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';
const P95_MS = __ENV.P95_MS || 400;

export const options = {
  vus: 30,
  duration: '1m',
  thresholds: {
    http_req_duration: [`p(95)<${P95_MS}`], // SLO: p95 < 400ms
    http_req_failed: ['rate<0.01'],         // SLO: error rate < 1%
  },
};

export default function () {
  const res = http.get(BASE_URL);
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
