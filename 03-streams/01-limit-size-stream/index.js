const LimitStream = require('./LimitSizeStream.js');
const fs = require('fs');

const limitedStream = new LimitStream({limit: 11});
const outStream = fs.createWriteStream('out.txt');

limitedStream.pipe(outStream);

limitedStream.write('lol123');

limitedStream.on('error', (err) => {
  if (err.code === 'LIMIT_EXCEEDED') {
    clearInterval(interval);
    throw err;
  }
});

const interval = setInterval(() => {
  limitedStream.write('wow');
}, 10);
