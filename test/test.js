/**
 * Test that the server & client work.
 */

var assert = require('assert'),
    Zombie = require('zombie'),
    server = require('../server');

describe('Socket.io Echo Test', function() {
  var browser;

  before(function(done) {
    server.io.disable('log');
    server.listen(3000, function(err) {
      if (err) throw err;
      browser = new Zombie({
        debug: false,
        site: 'http://localhost:3000'
      });
      done();
    })
  });

  it('should be able to echo non-transformed text', function(done) {
    browser.visit('/', function(err, browser, status) {
      assert.ifError(err);
      assert.equal(status, 200, 'The response did not have status 200');
      browser.window.socket.on('msg', function(msg) {
        assert.equal(msg, 'Testing Stuff');
        done();
      });
      browser.window.socket.emit('msg', 'none', 'Testing Stuff');
    });
  });

  it('should be able to echo upper-cased text', function(done) {
    browser.visit('/', function(err, browser, status) {
      assert.ifError(err);
      assert.equal(status, 200, 'The response did not have status 200');
      browser.window.socket.on('msg', function(msg) {
        assert.equal(msg, 'TESTING MORE STUFF');
        done();
      });
      browser.window.socket.emit('msg', 'upper', 'Testing More Stuff');
    });
  });

  it('should be able to echo lower-cased text', function(done) {
    browser.visit('/', function(err, browser, status) {
      assert.ifError(err);
      assert.equal(status, 200, 'The response did not have status 200');
      browser.window.socket.on('msg', function(msg) {
        assert.equal(msg, 'testing even more stuff');
        done();
      });
      browser.window.socket.emit('msg', 'lower', 'Testing Even More Stuff');
    });
  });

});
