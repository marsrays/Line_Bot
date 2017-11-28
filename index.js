var getJSON = require('get-json');
var request = require("request");
var cheerio = require("cheerio");
var express = require('express');
var fs = require('fs');
const app = express();

var linebot = require('linebot');
var server = require('http').Server(app);

// 刷新pixnet js
function refreshJS(event) {
    var dir = __dirname + '/download_file'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const REPLY = event.reply;
    var filePath = dir + '/GoToThePixnetadToGo.js';
	
    request({
        url: "https://raw.githubusercontent.com/marsrays/Go_To_The_Pixnetad_To_Go/master/GoToThePixnetadToGo.js",
        method: "GET"
    }, function(e,r,b) { /* Callback 函式 */
        /* e: 錯誤代碼 */
        /* b: 傳回的資料內容 */
        if(e || !b) { return; }

        fs.writeFile(filePath, b, 'utf8');	
        REPLY("搞定！");
    });
}

// 取得LINE貼圖資訊
function getStickerInfo(packageId, event) {
    console.log("getStickerInfo", packageId, event);
    const REPLY = event.reply;
    request({
        url: "https://store.line.me/stickershop/product/"+packageId,
        method: "GET",
        headers: {
            "Accept-Language": "zh-TW"
        }
    }, function(e,r,b) { /* Callback 函式 */
        /* e: 錯誤代碼 */
        /* b: 傳回的資料內容 */
        if(e || !b) { return; }

        var $ = cheerio.load(b);
        var title = $("title")[0];
        var titleName = $(title).text();
        console.log(titleName);
        REPLY(titleName);
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
bot.on('follow', function (event) {
    console.log("USER FOLLOW:", event.source.userId);
    event.source.profile().then(function (profile) {
        event.reply('Hello ' + profile.displayName + "歡迎來到My_AI自動化訊息區，我可以認得貼圖唷~");
    });
    bot.push(event.source.userId, "我也可以主動通知提醒唷！")
});
bot.on('join', function (event) {
    console.log("USER JOIN:", event.source.userId);
    event.reply("歡迎來到My_AI自動化訊息區，我可以認得貼圖唷~");
});
bot.on('message', function(event) {
    console.log("BOT GET A MESSAGE:", event.source.userId); //把收到訊息的 event 印出來看看

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
            } else if ("刷新js") {
                refreshJS(event);
            } else {
                setTimeout(function(){
                    var sendMsg = event.message.text;
                    event.reply(sendMsg);
                    console.log('send: '+sendMsg);
                },2000);
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

/*other API*/
app.get('/js/:filename', function(req, res) {
    var file = __dirname + '/download_file/' + req.params.filename + '.js';
    res.download(file); // Set disposition and send it.
});

server.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now runing on port", port);
});
