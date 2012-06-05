/**
 * Simple socket.io echo server.
 */

var express = require('express'),
    socketio = require('socket.io'),
    routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

// Transform text.
function transform(trans, text) {
  if (trans === 'upper') {
    return text.toUpperCase();
  }
  else if (trans === 'lower') {
    return text.toLowerCase();
  }
  else {
    return text;
  }
};

// Socket.io
app.io = socketio.listen(app);
app.io.sockets.on('connection', function(socket) {
  socket.on('msg', function(trans, msg) {
    socket.emit('msg', transform(trans, msg));
  });
});

// Start the server.
if (!module.parent) {
  app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
}