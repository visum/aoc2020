const fs = require("fs");
const {countAllChildBags, parseRules} = require("./lib");

const input = fs.readFileSync("./input.txt", {encoding:"utf-8"});

const rules = parseRules(input);

const bagCount = countAllChildBags(rules, "shiny gold");

console.log(`The shiny gold bag requires ${bagCount} bags inside it`);