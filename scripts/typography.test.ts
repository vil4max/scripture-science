// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { innerQuotes, langOf, nbsp } from '../src/lib/typography.ts';

test('inner quotation marks become „“ even when an excerpt is cut', () => {
  assert.equal(innerQuotes('Скажи: «Он — Аллах Единый,'), 'Скажи: „Он — Аллах Единый,');
  assert.equal(innerQuotes('слова «Отец больше меня»'), 'слова „Отец больше меня“');
});

test('short pieces stay on one line', () => {
  assert.equal(nbsp('в 1054 г. от Р. Х. — раскол'), 'в 1054 г. от Р. Х. — раскол');
  assert.equal(nbsp('(1 Кор 3:9; § 90)'), '(1\u00a0Кор 3:9; §\u00a090)');
  assert.equal(nbsp('Глава 1 Ветхого'), 'Глава 1 Ветхого');
});

test('English text is marked as English, Russian is not', () => {
  assert.equal(langOf('There are three kingdoms of glory'), 'en');
  assert.equal(langOf('Сын Божий (Filioque)'), undefined);
});
