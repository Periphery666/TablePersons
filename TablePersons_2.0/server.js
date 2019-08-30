const express = require("express");
const bodyParser = require("body-parser");
const convert = require('xml-js');
const { Parser } = require('json2csv');
const yaml = require('js-yaml');
const fs = require("fs");

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));

app.post("/json", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    let data = JSON.stringify(req.body);
    fs.writeFileSync("persons.json", data);
    data = JSON.parse(data);

    res.send(data);
});

app.post("/xml", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    let data = JSON.stringify(req.body);

    let options = {compact: true, ignoreComment: true, spaces: 4};
    let result = convert.json2xml(data, options);
    fs.writeFileSync("persons.xml", result);
    data = JSON.parse(data);

    res.send(data);
});

app.post("/csv", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    let data = req.body;
    const fields = ['id', 'firstName', 'lastName', 'age'];
    const opts = { fields };

    const parser = new Parser(opts);
    const result = parser.parse(req.body);
    fs.writeFileSync("persons.csv", result);

    res.send(data);
});

app.post("/yaml", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    let data = JSON.stringify(req.body);
    fs.writeFileSync("persons.yaml", data);
    data = JSON.parse(data);

    res.send(data);
});

app.listen(3000, function(){
    console.log("Сервер подключен!");
});

module.exports.app = app;