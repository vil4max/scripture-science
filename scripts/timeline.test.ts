// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:fs has no types without @types/node
import { readFileSync } from 'node:fs';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
// @ts-expect-error - node:url has no types without @types/node
import { fileURLToPath } from 'node:url';
import lineageData from '../src/data/lineage.json' with { type: 'json' };
import {
  assignBranchColumns,
  assignLanes,
  AXIS_MAX_YEAR,
  AXIS_MIN_YEAR,
  buildChronicleRows,
  buildForest,
  formatYearAd,
  MIN_LABEL_FONT_PX,
  nodeEventText,
  parseLineage,
  validateReferences,
  yearFromCreation,
  type Lineage,
} from '../src/lib/timeline.ts';

const lineage: Lineage = parseLineage(lineageData);
test('historical rows retain branch spans after religious epochs are separated', () => {
  const history = buildChronicleRows(lineage).filter((row) => row.kind !== 'epoch');
  const layout = assignBranchColumns(lineage, history);
  for (const node of lineage.nodes) {
    const [start, end] = layout.span.get(node.id)!;
    assert.equal(history[start].id, node.id);
    assert.ok(end >= start && end < history.length);
    if (node.parent) assert.ok(layout.span.get(node.parent)![0] < start);
  }
  const html = readFileSync('dist/timeline/index.html', 'utf8');
  const historyHtml = html.split('id="detailed-chronology"')[1];
  assert.doesNotMatch(html, /class="history-guide"/);
  assert.ok(readFileSync('dist/sources/index.html', 'utf8').includes('Начало мира в религиозных традициях'));
  assert.doesNotMatch(historyHtml, /class="am"|data-selfview|row epoch/);
  assert.ok(historyHtml.includes('до н. э.'));
  assert.ok(historyHtml.includes('без нулевого года'));
  assert.doesNotMatch(historyHtml, /divider era|Начало нашей эры — отсчёт/);
  for (const view of lineage.selfViews) {
    const profile = readFileSync(`dist/traditions/${view.tradition}/index.html`, 'utf8');
    assert.ok(profile.includes(view.summary), view.tradition);
  }
});
test('the committed lineage.json validates against the schema', () => {
  assert.doesNotThrow(() => parseLineage(lineageData));
});

test('every node.parent and union/selfView reference resolves', () => {
  assert.doesNotThrow(() => validateReferences(lineage));
});

test('every date (nodes, unions, others, epochs, self-view gaps) lies inside the axis', () => {
  const minYear = AXIS_MIN_YEAR;
  const maxYear = AXIS_MAX_YEAR;
  const years: number[] = [];
  for (const node of lineage.nodes) years.push(node.start.year);
  for (const union of lineage.unions) years.push(union.year);
  for (const other of lineage.others) {
    years.push(other.from);
    if (other.to !== undefined) years.push(other.to);
  }
  for (const epoch of lineage.epochs) years.push(epoch.year);
  for (const selfView of lineage.selfViews) {
    if (selfView.from.year !== undefined) years.push(selfView.from.year);
    for (const gap of selfView.gaps ?? []) {
      years.push(gap.from, gap.to);
    }
  }
  for (const year of years) {
    assert.ok(
      year >= minYear && year <= maxYear,
      `year ${year} is outside the axis [${minYear}, ${maxYear}]`,
    );
  }
});

test('node lanes follow tree order (a node comes right after its parent, before any later sibling subtree)', () => {
  const forest = buildForest(lineage.nodes);
  const lanes = assignLanes(forest);
  assert.equal(lanes.size, lineage.nodes.length);
  for (const node of lineage.nodes) {
    if (!node.parent) continue;
    assert.ok(lanes.get(node.id)! > lanes.get(node.parent)!, `${node.id} should be laned after its parent ${node.parent}`);
  }
});

test('every node.tradition, when set, is one of the eight coloured traditions', () => {
  const eight = new Set([
    'judaism',
    'orthodoxy',
    'catholicism',
    'islam',
    'protestantism',
    'lds',
    'adventism',
    'jw',
  ]);
  for (const node of lineage.nodes) {
    if (node.tradition) assert.ok(eight.has(node.tradition), `${node.id} has unknown tradition "${node.tradition}"`);
  }
});

test('every epoch.tradition, when set, has a matching node on the tree', () => {
  const traditionsWithNodes = new Set(lineage.nodes.map((n) => n.tradition).filter(Boolean));
  for (const epoch of lineage.epochs) {
    if (epoch.tradition) {
      assert.ok(traditionsWithNodes.has(epoch.tradition), `epoch "${epoch.id}" has no node of tradition "${epoch.tradition}"`);
    }
  }
});

test('every self-view tradition has a matching node on the tree', () => {
  const traditionsWithNodes = new Set(lineage.nodes.map((n) => n.tradition).filter(Boolean));
  for (const selfView of lineage.selfViews) {
    assert.ok(traditionsWithNodes.has(selfView.tradition), `selfView "${selfView.tradition}" has no node of that tradition`);
  }
});

// --- M11: the vertical chronicle ------------------------------------------

const rows = buildChronicleRows(lineage);

test('years from the Creation follow the Byzantine era (year 1 = 5509/5508 BC, January-August reckoning)', () => {
  assert.equal(yearFromCreation(-5508), 1);
  assert.equal(yearFromCreation(-1), 5508);
  assert.equal(yearFromCreation(1), 5509);
  assert.equal(yearFromCreation(33), 5541);
  assert.equal(yearFromCreation(1054), 6562);
  assert.equal(yearFromCreation(2026), 7534);
  assert.equal(yearFromCreation(2026, true), 7535);
  assert.throws(() => yearFromCreation(0));
  assert.equal(formatYearAd(-5508), '5508 г. до Р.Х.');
  assert.equal(formatYearAd(1054), '1054 г.');
});

test('the chronicle has one row per dated item, oldest first, starting with the Byzantine creation epoch', () => {
  assert.equal(
    rows.length,
    lineage.nodes.length + lineage.unions.length + lineage.epochs.length + lineage.others.length,
  );
  for (let i = 1; i < rows.length; i++) {
    assert.ok(rows[i - 1].year <= rows[i].year, `row ${i} (${rows[i].id}) is older than the row above it`);
  }
  assert.equal(rows[0].id, 'byzantine-era');
});

test('Sacred History becomes the Church line while later rejections form separate branches', () => {
  const nodeById = new Map(lineage.nodes.map((node) => [node.id, node]));
  const rowById = new Map(rows.map((row) => [row.id, row]));
  assert.equal(nodeById.get('early-christianity')?.parent, 'israelite-second-temple');
  assert.equal(nodeById.get('early-christianity')?.kind, 'trunk');
  assert.equal(nodeById.get('rabbinic-judaism')?.parent, 'israelite-second-temple');
  assert.equal(nodeById.get('church-of-the-east')?.start.year, 484);
  assert.equal(nodeById.get('catholicism')?.parent, 'early-christianity');
  assert.equal(nodeById.has('chalcedonian-christianity'), false);
  assert.equal(rowById.get('third-ecumenical-council')?.kind, 'other');
  assert.equal(rowById.get('fourth-ecumenical-council')?.kind, 'other');
  assert.match(rowById.get('early-christianity')?.text ?? '', /завершилась ветхозаветная история спасения/);
  assert.match(rowById.get('early-christianity')?.text ?? '', /Антиохии/);
  assert.match(rowById.get('rabbinic-judaism')?.text ?? '', /не признавшую Иисуса Христа Мессией/);
});

test('the Church continues the Sacred History trunk while Judaism leaves it as a branch', () => {
  const { column } = assignBranchColumns(lineage, rows);
  assert.equal(column.get('early-christianity'), column.get('israelite-second-temple'));
  assert.notEqual(column.get('rabbinic-judaism'), column.get('israelite-second-temple'));
});

test('on a tie a parent separation comes before its child', () => {
  const index = new Map(rows.map((r, i) => [r.id, i]));
  for (const node of lineage.nodes) {
    if (!node.parent) continue;
    assert.ok(index.get(node.parent)! < index.get(node.id)!, `${node.parent} should come before ${node.id}`);
  }
});

test('an event text does not repeat the year and keeps the start label\'s event', () => {
  for (const node of lineage.nodes) {
    const text = nodeEventText(node);
    const cut = node.start.label.indexOf(' · ');
    if (cut !== -1) assert.ok(text.toLowerCase().includes(node.start.label.slice(cut + 3).toLowerCase()) || text.toLowerCase().includes((node.event?.label ?? '').toLowerCase()));
  }
});

test('branch columns: no two lines share a column on the same row, and a child never takes its living parent\'s column', () => {
  const { column, span, columns } = assignBranchColumns(lineage, rows);
  assert.equal(column.size, lineage.nodes.length);
  const ids = lineage.nodes.map((n) => n.id);
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      if (column.get(ids[i]) !== column.get(ids[j])) continue;
      const [a1, b1] = span.get(ids[i])!;
      const [a2, b2] = span.get(ids[j])!;
      // A continuation may share exactly the row where its parent's line ends.
      assert.ok(b1 <= a2 || b2 <= a1, `${ids[i]} and ${ids[j]} overlap in column ${column.get(ids[i])}`);
    }
  }
  // The fewest columns possible: the number of lines alive on one row.
  let peak = 0;
  for (let r = 0; r < rows.length; r++) {
    peak = Math.max(peak, ids.filter((id) => span.get(id)![0] <= r && r < span.get(id)![1]).length);
  }
  assert.ok(columns <= peak + 1, `${columns} columns for at most ${peak} lines alive at once`);
});

test('living lines are every node but a structural one with children, whatever row its last child is on', () => {
  const { living, span } = assignBranchColumns(lineage, rows);
  assert.ok(!living.has('reformation'), 'the Reformation line ends at its last child (Pentecostalism), not at the present');
  assert.ok(living.has('pentecostalism'));
  assert.ok(living.has('early-christianity'));
  for (const node of lineage.nodes) {
    if (!living.has(node.id)) assert.ok(lineage.nodes.some((n) => n.parent === node.id), `${node.id} ends without children`);
    else assert.equal(span.get(node.id)![1], rows.length - 1, `${node.id} is living but its span stops early`);
  }
});

test('no text in the chronicle styles is below the minimum size', () => {
  const source = readFileSync(fileURLToPath(new URL('../src/components/timeline/Chronicle.astro', import.meta.url)), 'utf8');
  const sizes = [...source.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)].map((m) => Number(m[1]));
  assert.ok(sizes.length > 0);
  for (const size of sizes) assert.ok(size >= MIN_LABEL_FONT_PX, `font-size ${size}px is below ${MIN_LABEL_FONT_PX}px`);
});

test('the rendered chronicle keeps a strong Orthodox trunk, varied branches and the emphasized Great Schism', () => {
  const source = readFileSync(fileURLToPath(new URL('../src/components/timeline/Chronicle.astro', import.meta.url)), 'utf8');
  const html = readFileSync('dist/timeline/index.html', 'utf8');
  assert.match(source, /const colX = \(c: number\) => BIBLICAL_X \+ c \* COL_W/);
  assert.match(source, /n\.id === 'israelite-second-temple'\) continue/);
  assert.match(source, /\.seg\.main-trunk[\s\S]*width: 5px/);
  assert.match(source, /node\.id === 'early-christianity'[\s\S]*'var\(--testament-new\)'/);
  assert.match(source, /\['rabbinic-judaism', 'light-dark\(#4338ca, #818cf8\)'\]/);
  assert.match(source, /\['pentecostalism', 'light-dark\(#0e7490, #22d3ee\)'\]/);
  assert.match(html, /row node major-schism/);
  assert.match(html, /Пятидесятница — явление Церкви и продолжение единой Священной истории/);
  assert.doesNotMatch(html, /Начало нашей эры — отсчёт от Рождества Христова/);
  assert.match(html, /перед ним идёт 1 год до н\. э\., без нулевого года/);
  assert.match(html, /Великий раскол: отпадение Рима/);
  assert.match(html, /Начало протестантизма · Реформация/);
  assert.match(html, /замена канонической принадлежности/);
});

test('the biblical comparison line is chronological without displacing branch connections', () => {
  const biblical = JSON.parse(readFileSync('src/data/biblical-timeline.json', 'utf8'));
  const rows = buildChronicleRows(lineage, biblical).filter((row) => row.kind !== 'epoch');
  assert.equal(rows[0].id, 'biblical-creation');
  assert.equal(new Set(rows.map((row) => row.id)).size, rows.length);
  for (let i = 1; i < rows.length; i++) assert.ok(rows[i].year >= rows[i - 1].year);
  assert.ok(rows.every((row) => row.year !== 0));
  const layout = assignBranchColumns(lineage, rows);
  for (const node of lineage.nodes) {
    const [start, end] = layout.span.get(node.id)!;
    assert.equal(rows[start].id, node.id);
    assert.ok(end >= start);
    if (node.parent) assert.ok(layout.span.get(node.parent)![0] < start);
  }
  const html = readFileSync('dist/timeline/index.html', 'utf8');
  for (const row of biblical) assert.ok(html.includes(`data-row-id="${row.id}"`));
  assert.doesNotMatch(html, /Промежуток/);
  assert.doesNotMatch(html, /gap-caption|divider gap/);
  assert.doesNotMatch(html, /class="head"|id="jw-legal-note"|События идут последовательно/);
  assert.match(html, /сохранив византийский обряд/);
  assert.match(html, /хронологическая традиция/);
  assert.match(html, /data-row-id="biblical-creation" data-testament="old"/);
  assert.match(html, /data-row-id="biblical-nativity" data-testament="new"/);
  assert.match(html, /data-row-id="early-christianity" data-testament="new"/);
  assert.doesNotMatch(html, /Пунктир соединяет/);
  assert.doesNotMatch(html, /Перейти к подробным событиям/);
  const chapters = JSON.parse(readFileSync('src/data/history-overview.json', 'utf8'));
  for (const chapter of chapters) {
    const destination = chapter.id === 'evidence' ? readFileSync('dist/sources/index.html', 'utf8') : html;
    assert.equal(destination.split(`id="history-${chapter.id}"`).length - 1, 1, chapter.id);
    if (chapter.id === 'evidence') assert.ok(!html.includes('id="history-evidence"'));
    if (chapter.timelineRow) assert.ok(rows.some((row) => row.id === chapter.timelineRow));
  }
  assert.equal(html.split('data-chronicle').length - 1, 1);
});
