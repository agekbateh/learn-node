const stream = require('stream');
const LimitExceededError = require('./LimitExceededError.js');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.size = 0;
    this.options = options;
  }

  _transform(chunk, encoding, callback) {
    this.size += chunk.length;
    if (this.size > this.options.limit) {
      throw new LimitExceededError(`Limit has been exceeded ${this.size}.`);
    }
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
