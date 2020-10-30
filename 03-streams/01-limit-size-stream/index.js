const LimitStream = require('./LimitSizeStream.js');
const fs = require('fs');


const limitedStream = new LimitStream({limit: 13});
const outStream = fs.createWriteStream('out.txt');

limitedStream.pipe(outStream);

limitedStream.write('lol');

limitedStream.on('error', (err) => {
  console.log('🤓', err);
});

setInterval(() => {
  limitedStream.write('wow');
}, 10);
