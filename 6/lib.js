const { group } = require("console");

const getPeople = (input) => {
  return input.split("\n");
};

const getGroups = (input) => {
  return input.split("\n\n");
};

const getUniqueYesAnswers = (group) => {
  const people = getPeople(group);
  const unique = new Set();
  people.forEach((person) => {
    [...person].forEach((question) => {
      unique.add(question);
    });
  });
  return unique;
};

const getCommonYesAnswers = (group) => {
  const people = getPeople(group);
  const common = new Set(people.shift());
  people.forEach((person) => {
    for (let answer of common) {
      if (![...person].includes(answer)) {
        common.delete(answer);
      }
    }
  });
  return common;
};

const sumTestResults = (input, tester) => {
  const groups = getGroups(input);
  return groups.reduce((sum, group) => {
    const results = tester(group);
    const numResultMatches = [...results.values()].length;
    return numResultMatches + sum;
  }, 0);
};

module.exports = {
  getUniqueYesAnswers,
  getCommonYesAnswers,
  sumTestResults
};
