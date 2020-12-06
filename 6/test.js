const assert = require('assert');
const {getUniqueYesAnswers, sumUniqueYesAnswersFromGroups, sumCommonYesAnswersFromGroups, sumTestResults, getCommonYesAnswers} = require('./lib');

const aGroup = `a
ab
c
abc
ac
c`;

assert([...getUniqueYesAnswers(aGroup).values()].length === 3);

const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

assert(sumTestResults(testInput, getUniqueYesAnswers) === 11);
assert(sumTestResults(testInput, getCommonYesAnswers) === 6);