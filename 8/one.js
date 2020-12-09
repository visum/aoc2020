const fs = require("fs");
const Machine = require("./Machine");

const input = fs.readFileSync("./input.txt", {encoding:"utf-8"});

const machine = new Machine();
machine.load(input);

machine.run();