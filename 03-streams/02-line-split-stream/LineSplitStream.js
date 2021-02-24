const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.remainder = '';
  }

  _transform(chunk, encoding, callback) {
    const str = this.remainder + chunk.toString();
    const lines = str.split(os.EOL);
    const lastLine = lines.pop();
    this.remainder = '';

    for (const line of lines) {
      this.push(line);
    }

    if (str.endsWith(os.EOL)) {
      this.push(lastLine);
    } else {
      this.remainder = lastLine;
    }

    callback();
  }

  _flush(callback) {
    if (this.remainder) {
      this.push(this.remainder);
    }

    callback();
  }
}


// писал изначально сам, так оно и не заработало. Подсмотрел удивился, почему не работает не понятно


// class LineSplitStream extends stream.Transform {
//   constructor(options) {
//     super(options);
//     this.part = '';
//   }
//
//   _transform(chunk, encoding, callback) {
//     const str = chunk.toString('utf8');
//     const eol = str.indexOf(`${os.EOL}`) > -1;
//     const data = str.split(`${os.EOL}`);
//     const last = data.pop();
//     if (eol) {
//       for (const line of data) {
//         this.push(line);
//       }
//       if (str.endsWith(os.EOL)) {
//         this.push(last);
//       } else {
//         this.part = last;
//       }
//     } else {
//       this.push(chunk);
//     }
//     callback();
//   }
//
//   _flush(callback) {
//     if (this.part) {
//       this.push(this.part);
//     }
//     callback();
//   }
// }

module.exports = LineSplitStream;
