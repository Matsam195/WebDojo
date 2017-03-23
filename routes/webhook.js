var express = require('express');
var router = express.Router();
var chatService = require('../server/chatService');

router.get('/', function(req, res, next) {
  if (chatService.authenticate(req)) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

router.post('/webhook', function (req, res) {
var data = req.body;
if (data.object === 'page') {
  data.entry.forEach(function(entry) {
    var pageID = entry.id;
    var timeOfEvent = entry.time;
    entry.messaging.foreach(function(event) {
      if (event.message) {
        chatService.receivedMessage(event);
      } else {
        console.log("Webhook received unknown event: ", event);
      }
    });
  });
  chatService.sendTextMessage(event.sender.id, "Ok !");
}});

module.exports = router;
