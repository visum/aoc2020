const fs = require('fs');
const {sumTestResults, getUniqueYesAnswers} = require('./lib');

const input = fs.readFileSync("./input.txt", {encoding:"utf-8"});

const sum = sumTestResults(input, getUniqueYesAnswers);

console.log("The asnwer is", sum);


