"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();
var routes_1 = require("./routes/routes");
var App = /** @class */ (function () {
    function App() {
        this.routePrv = new routes_1.Routes();
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    App.prototype.mongoSetup = function () {
        mongoose.Promise = global.Promise;
        mongoose
            .connect(process.env.MONGO_URL, { useNewUrlParser: true })
            .then(function () { return console.log("Connected to MongoDB."); })
            .catch(function (err) {
            throw err;
        });
    };
    App.prototype.config = function () {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    };
    return App;
}());
// tslint:disable-next-line:no-default-export
exports.default = new App().app;
//# sourceMappingURL=app.js.map