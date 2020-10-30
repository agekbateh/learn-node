
class LimitExceededError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.code = 'LIMIT_EXCEEDED';
  }
}

module.exports = LimitExceededError;
