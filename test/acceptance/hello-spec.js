/* eslint-disable no-unused-expressions */
require('colors');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var expect = chai.expect;
var port = process.env.port || 3000;
var wd = require('wd');

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe('acceptance test', function() {
  this.timeout(10000);
  var browser;

  before(function() {
    browser = wd.promiseChainRemote();
    // optional extra logging
    browser.on('status', function(info) {
      console.log(info.cyan);
    });
    browser.on('command', function(eventType, command, response) {
      console.log(' > ' + eventType.cyan, command, (response || '').grey);
    });
    browser.on('http', function(meth, path, data) {
      console.log(' > ' + meth.magenta, path, (data || '').grey);
    });
    return browser.init({browserName:'chrome'});
  });

  beforeEach(function() {
    return browser.get('http://localhost:' + port);
  });

  after(function() {
    return browser.quit();
  });

  it('has title of React Starter', function() {
    return browser.title().should.become('React Starter');
  });
});
