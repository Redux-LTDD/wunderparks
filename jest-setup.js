import regeneratorRuntime from 'regenerator-runtime';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

module.exports = () => {
  global.testServer = require('./server/server.js');
  // global.fetch = require('jest-fetch-mock');
};
