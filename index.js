var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: process.env.ChannelId,
    channelSecret: process.env.ChannelAccessToken,
    channelAccessToken: process.env.ChannelSecret
});

bot.on('message', function(event) {
    console.log(event);
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now runing on port", port);
});
