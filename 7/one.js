const fs = require("fs");
const { countBagsCanHoldType, parseRules } = require("./lib");

const input = fs.readFileSync("./input.txt", {encoding: "utf-8"});
const rules = parseRules(input);

console.log(
  "Number of bags that can hold shiny gold",
  countBagsCanHoldType(rules, "shiny gold")
);
