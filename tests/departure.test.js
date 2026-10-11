import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('without published voyages, departure stays static and has no countdown wiring', () => {
  const routes = readFileSync(new URL('../src/components/sections/Routes.astro', import.meta.url), 'utf8');
  const main = readFileSync(new URL('../src/scripts/main.js', import.meta.url), 'utf8');
  const summary = routes.match(/>Próxima salida<\/div>([\s\S]*?)<\/p>/)?.[1];
  assert.ok(summary, 'departure summary exists');
  assert.match(summary, /Fecha de salida no publicada/);
  assert.match(summary, /Consulta una fecha confirmada con nuestro equipo\./);
  assert.doesNotMatch(summary, /id="countdown"|\d+h|Martes|06:00/);
  assert.doesNotMatch(main, /departure\.js|initDepartureCountdown/);
});
