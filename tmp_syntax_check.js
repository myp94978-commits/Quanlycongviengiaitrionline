const fs = require('fs');
const text = fs.readFileSync('src/app/admin/users/page.jsx', 'utf8');
let paren=0, brace=0, bracket=0;
for (const ch of text) {
  if (ch === '(') paren++;
  else if (ch === ')') paren--;
  else if (ch === '{') brace++;
  else if (ch === '}') brace--;
  else if (ch === '[') bracket++;
  else if (ch === ']') bracket--;
}
console.log('paren', paren, 'brace', brace, 'bracket', bracket);
