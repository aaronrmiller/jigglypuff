const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const { PORT } = process.env;
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(PORT);

io.on('connection', socket => {
  socket.on('message', msgData => {
    socket.emit('addedItem', {
      user_id: 1,
      description: 'dope',
      pic_url: '/static/2.jpg'
    }); // when the item is added to the DB by any user, an 'addedItem' message is emiited,
    // which will be broadcasted to all users, so that they can update their local state.
    console.log('received message from client: ', msgData);
  });

  socket.on('disconnect', function() {
    io.emit('user disconnected');
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api', routes);

app.use(function(req, res, next) {
  //404
  res.locals.message = 'PAGE NOT FOUND';
  const err = new Error('RESOURCE NOT FOUND');
  err.status = 404;
  return next(err);
});

// Dedicated error handler
app.use(function(err, req, res, next) {
  res.status(404).json(err);
});

// app.listen(PORT, () => {
//   console.log(`server listening on port ${PORT}`);
// });
