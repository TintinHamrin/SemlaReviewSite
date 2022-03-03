"use strict";
exports.__esModule = true;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var express = require('express');
var PORT = process.env.PORT || 3001;
var buttonClicks = 0;
var userCounterMainPage = 0;
var userCounterBakeryPage = 0;
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.start = function () {
        this.app.get('/hello', function (req, res) {
            res.json({ message: 'Hello from server!' });
        });
        this.app.get('/bakery-visits-count', function (req, res) {
            userCounterBakeryPage = userCounterBakeryPage + 1;
            console.log('bakery counter:', userCounterBakeryPage);
            res.send(userCounterBakeryPage.toString()); // there is better methods than get for this for friendliness to read/intent matters/match intent/ its a big subject...
        });
        this.app.get('/button-clicks', function (req, res) {
            buttonClicks = buttonClicks + 1;
            console.log(buttonClicks);
        });
        this.app.get('/m', function (req, res) {
            userCounterMainPage = userCounterMainPage + 1;
            console.log('counter:', userCounterMainPage);
        });
        this.app.listen(PORT, function () {
            console.log("Server listening on ".concat(PORT));
        });
    };
    Server.app = express();
    return Server;
}());
exports["default"] = Server;
