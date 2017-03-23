var express = require('express');
var router = express.Router();
var authenticate = require('../server/chatService');

router.get('/', function(req, res, next) {
  if (authenticate.authenticate(req)) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
  res.send('ok');
});

module.exports = router;
