var express = require('express');
const app = express();

var LINEBot = require('line-messaging');
var server = require('http').Server(app);


var bot = LINEBot.create({
    channelID: process.env.ChannelId,
    channelSecret: process.env.ChannelAccessToken,
    channelToken: process.env.ChannelSecret
}, server);

console.log("bot id:", process.env.ChannelId);
console.log("bot Secret:", process.env.ChannelAccessToken);
console.log("bot Token:", process.env.ChannelSecret);

app.use(bot.webhook('/webhook'));
bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {
    console.log(replyToken, message);
});
server.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now runing on port", port);
});