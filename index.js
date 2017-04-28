var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: 1512220056,
    channelSecret: "f717a97237db9bc70d4615c338a4a2cb",
    channelAccessToken: "GYiKHZkEuDE0Mi6Lx1OLtQxaqzqgrs8HLYH4NK2eDQCCOGpllWeAETaChhiBJAk24CpQXXkex8MINujrs09uXd9QSiYOCw1peR/WUDBi+dB+T+n7tGGeOSL1ZpcZa6eDUhyUD01C2+EQXAeywgW2BgdB04t89/1O/w1cDnyilFU="
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
