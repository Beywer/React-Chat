const {compose} = require('react-app-rewired');
const rewireEsLint = require('react-app-rewire-eslint');
const rewirePolyfills = require('react-app-rewire-polyfills');

module.exports = compose(
  rewireEsLint,
  rewirePolyfills,
);
