var express = require('express');
const app = express();

//var LINEBot = require('line-messaging');
var linebot = require('linebot');
var server = require('http').Server(app);


// var bot = LINEBot.create({
//     channelID: process.env.ChannelId,
//     channelSecret: process.env.ChannelAccessToken,
//     channelToken: process.env.ChannelSecret
// }, server);
var bot = linebot({
    channelId: process.env.ChannelId,
    channelSecret: process.env.ChannelSecret,
    channelAccessToken: process.env.ChannelAccessToken
});

console.log("bot id:", process.env.ChannelId);
console.log("bot Secret:", process.env.ChannelAccessToken);
console.log("bot Token:", process.env.ChannelSecret);

// app.use(bot.webhook('/webhook'));
// bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {
//     console.log(replyToken, message);
// });
app.use('/webhook', bot.parser());
bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
});

server.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now runing on port", port);
});