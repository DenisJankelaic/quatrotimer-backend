"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = 3001;
app_1.default.listen(port, function () {
    console.info("Listening at http://localhost:" + port + "/");
});
//# sourceMappingURL=server.js.map