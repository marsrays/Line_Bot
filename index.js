var getJSON = require('get-json');
var express = require('express');
const app = express();

var linebot = require('linebot');
var server = require('http').Server(app);

// 取得LINE貼圖資訊
function getStickerInfo(packageId, event) {
    console.log("getStickerInfo", packageId, event);
    getJSON('https://store.line.me/stickershop/product/'+packageId, function(error, response) {
        console.log(response);
        var msg = '要發送的文字';
        event.reply(msg).then(function(data) {
            // success
            console.log(msg);
        }).catch(function(error) {
            // error
            console.log('error');
        });
    });
}

var bot = linebot({
    channelId: process.env.ChannelId,
    channelSecret: process.env.ChannelSecret,
    channelAccessToken: process.env.ChannelAccessToken
});

console.log("bot id:", process.env.ChannelId);
console.log("bot Secret:", process.env.ChannelAccessToken);
console.log("bot Token:", process.env.ChannelSecret);

app.use('/webhook', bot.parser());
bot.on('message', function(event) {
    console.log("BOT GET A MESSAGE:", event); //把收到訊息的 event 印出來看看

    var msg = "";
    switch(event.message.type) {
        case "sticker" :
            msg = "貼圖";
            if ('1252298' === event.message.packageId) {
                msg += " '喵尼愛撒嬌'";
            } else {
                msg = undefined;
                getStickerInfo(event.message.packageId, event);
            }
            break;
        case "text":
            if ("RAY" === event.message.text.toUpperCase()) {
                msg = "造物主";
            }
            break;
        default:
            msg = event.message.type;
            break;
    }

    if ("undefined" !== typeof msg) {
        event.reply(msg).then(function(data) {
            // success
            console.log(msg);
        }).catch(function(error) {
            // error
            console.log('error');
        });
    }

});

server.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now runing on port", port);
    bot.push('U73ab7d9b92ede34d22dcb330647b7e43', "BOT 已啟動");
});
