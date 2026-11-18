// Алхам 3 — ачааллыг шатлан өсгөх (ерөнхий зураг ажиглах зорилготой).
// Хүснэгтийн тоог эндээс БИШ, script.js-ийн тусдаа 5/30/100 VU ажиллуулалтаас авна.
import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // халаалт
    { duration: '1m', target: 30 },   // өсгөлт
    { duration: '30s', target: 100 }, // оргил
    { duration: '30s', target: 0 },   // буулт
  ],
};

export default function () {
  const res = http.get(BASE_URL);
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
