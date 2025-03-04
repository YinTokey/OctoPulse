require('ts-node').register({
  transpileOnly: true,

});
module.exports = require('./next.config.ts').default;
