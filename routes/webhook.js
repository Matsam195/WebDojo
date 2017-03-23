var express = require('express');
var router = express.Router();
var chatService = require('../server/chatService');
var userService = require('../server/userService');

router.get('/', function(req, res, next) {
  if (chatService.authenticate(req)) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

router.post('/', function (req, res) {
var data = req.body;
if (data.object === 'page') {
  data.entry.forEach(function(entry) {
    var pageID = entry.id;
    var timeOfEvent = entry.time;
    entry.messaging.forEach(function(event) {
      if (event.message) {
        if (userService.isUserKnown(event.sender.id)) {
          chatService.receivedMessage(event);
        } else {
          chatService.sendTextMessage(event.sender.id, "Bienvenue !");
          userService.addUser(event.sender.id, 0);
        }
      } else {
        console.log("Webhook received unknown event: ", event);
      }
    });
  });
  res.sendStatus(200);
}});

module.exports = router;
