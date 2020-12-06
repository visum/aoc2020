const fs = require('fs');
const {getCommonYesAnswers, sumTestResults} = require('./lib');

const input = fs.readFileSync("./input.txt", {encoding:"utf-8"});
const sum = sumTestResults(input, getCommonYesAnswers);

console.log("Part two answer: " + sum);