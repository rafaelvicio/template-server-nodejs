"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var api_1 = require("./api/api");
// Executando funcao de configuracao ao chamar 
var config = require('./config/env/config')();
var server = http.createServer(api_1.default);
// Api.use(errorHandlerApi);
server.listen(config.serverPort, function () { return console.log("Server are running on port " + config.serverPort + "  "); });
