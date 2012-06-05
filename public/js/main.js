
(function($) {

  var socket = io.connect('http://localhost:3000');

  var $input = $('#input');
  var $trans = $('#trans');

  socket.on('connect', function() {
    socket.on('msg', function(msg) {
      $('#output').text(msg);
    });
    $input.on('keyup', function(e) {
      socket.emit('msg', $trans.val(), $input.val());
    });
    $trans.on('change', function(e) {
      socket.emit('msg', $trans.val(), $input.val());
    });
  });

  // Expose socket on the window for testing.
  window.socket = socket;

})(jQuery);
