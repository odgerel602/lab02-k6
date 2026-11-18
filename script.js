// Алхам 2 — анхны тест (stages-гүй). VU/duration-ийг CLI-ээс өгнө:
//   k6 run --vus 30 --duration 1m script.js
//
// Бай: test.k6.io нь одоо https://quickpizza.grafana.com руу 302 redirect хийдэг
// (Grafana-ийн албан ёсны дадлагын сайт). Redirect бүр тусдаа request болж
// хэмжүүрийг хоёр дахин тоолуулдаг тул шууд эцсийн хаяг руу хандана.
import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = { vus: 5, duration: '30s' };

export default function () {
  const res = http.get(BASE_URL);
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
