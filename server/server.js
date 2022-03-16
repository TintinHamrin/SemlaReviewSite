"use strict";
exports.__esModule = true;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var express = require('express');
var PORT = process.env.PORT || 3001;
var buttonClicks = 0;
var userCounterMainPage = 0;
var userCounterBakeryPage = {};
// let property: keyof typeof userCounterBakeryPage; // apperantaly needed bc of TS??
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.start = function () {
        this.app.fs.writeFileSync('visit-counter.txt', userCounterBakeryPage.toString());
        this.app.get('/most-viewed', function (req, res) {
            console.log('most viewed');
            res.json({ message: 'Hello from server!' });
            // for (let property in userCounterBakeryPage) {
            //   res.send(`${property}: ${userCounterBakeryPage[property]}`);
            // }
        });
        this.app.get('/hello', function (req, res) {
            console.log('website counter');
            res.json({ message: 'Hello from server!' });
        });
        this.app.get('/bakery-visits-count/:placeId', function (req, res) {
            console.log('bakery visits count');
            var placeId = req.params.placeId;
            userCounterBakeryPage[placeId] || (userCounterBakeryPage[placeId] = 0);
            userCounterBakeryPage[placeId]++;
            console.log('bakery counter:', userCounterBakeryPage[placeId], 'place Id:', placeId);
            res.json(userCounterBakeryPage); // there is better methods than get for this for friendliness to read/intent matters/match intent/ its a big subject...
        });
        this.app.get('/button-clicks', function (req, res) {
            buttonClicks++;
            console.log(buttonClicks);
        });
        this.app.get('/visits-count', function (req, res) {
            userCounterMainPage++;
            console.log('counter:', userCounterMainPage);
            res.json({ message: 'Hello from server!' });
        });
        this.app.listen(PORT, function () {
            console.log("Server listening on ".concat(PORT));
        });
    };
    Server.app = express();
    return Server;
}());
exports["default"] = Server;
