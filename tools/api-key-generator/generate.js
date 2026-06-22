const crypto = require('crypto');

function getArg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1] || fallback;
}

function generateToken({ length = 48, prefix = 'ht_live' } = {}) {
  const bytes = crypto.randomBytes(Math.ceil(Number(length) * 0.75));
  const token = bytes
    .toString('base64url')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, Number(length));

  return `${prefix}_${token}`;
}

const length = Number(getArg('length', 48));
const prefix = getArg('prefix', 'ht_live');
const count = Number(getArg('count', 1));

if (!Number.isInteger(length) || length < 32) {
  console.error('Length moet minimaal 32 zijn. Advies: 48 of 64.');
  process.exit(1);
}

if (!Number.isInteger(count) || count < 1 || count > 20) {
  console.error('Count moet tussen 1 en 20 zijn.');
  process.exit(1);
}

console.log('\nHexTactics API Key Generator');
console.log('Bewaar deze keys veilig. Zet ze nooit in GitHub.\n');

for (let i = 0; i < count; i++) {
  console.log(generateToken({ length, prefix }));
}

console.log('\nVoor HexTacticsStore config.yml:');
console.log('security:');
console.log('  api-token: "PLAK_HIER_EEN_KEY"');

console.log('\nVoor worker/.env:');
console.log('PLUGIN_API_TOKEN=DEZELFDE_KEY_HIER');
