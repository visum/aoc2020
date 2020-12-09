const fs = require("fs");
const ProgramFixer = require("./ProgramFixer");

const input = fs.readFileSync("./input.txt", {encoding:"utf-8"});

const fixer = new ProgramFixer(input);

const programResult = fixer.run();

console.log("Final program accumulator state: ", programResult);
