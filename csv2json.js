/* eslint-disable */
const fs = require('fs');
const { pluck, uniq } = require('ramda');

const cols = [
  'id',
  'nom',
  'type',
  'organisation',
  'adresse',
  'lat',
  'lon',
  'url',
  'tel',
  'mail',
];

function parseCSV(csv) {
  const [...lines] = csv.split(';$END$\n');

  return lines.map((line, lineId) => {
    const obj = {};

    const cells = line.split(';');

    if (cells.length !== cols.length) {
      console.log(`Erreur ligne ${lineId}: ${cells.length}/${cols.length}`);
      return;
    }

    cols.forEach((col, i) => {
      obj[col] = cells[i].trim() || undefined;
    });

    return obj;
  }).filter(Boolean);
}

const structures = parseCSV(
  fs.readFileSync('data.csv', 'utf-8'),
);

console.log(uniq(pluck('type', structures)));

fs.writeFileSync(
  'data.json',
  JSON.stringify(structures, null, 2),
);
