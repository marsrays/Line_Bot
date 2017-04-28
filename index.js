var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: 1512220056,
    channelSecret: "CqTtMHmOxgTSj7VSTgpqrpu+top4TALAJfdhai/MWKtcwnTxnZzTVHBtxhT0lic14CpQXXkex8MINujrs09uXd9QSiYOCw1peR/WUDBi+dBbJCIf37vCnrRV5wrXAfUxT4v+4oy+4Mtw350tX3cZ7AdB04t89/1O/w1cDnyilFU=",
    channelAccessToken: "2b36c8f5a18d3c872b4439433e429701"
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
