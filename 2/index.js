const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf8" });

const entries = input.split("\n");

const entryRegexp = /(\d+)-(\d+) ([a-z]): (\w+)/i;

const parseEntry = (string) => {
  const [, min, max, char, password] = entryRegexp.exec(string);
  const result = {
    min: parseInt(min, 10),
    max: parseInt(max, 10),
    char,
    password,
  };
  return result;
};

const isValidPassword = (entry) => {
  const {min, max, char, password} = entry;

  const searchRegexp = new RegExp(char, 'g');
  const matchCount = [...password.matchAll(searchRegexp)].length;

  return matchCount >= min && matchCount <= max;
};

const processRow = (row) => {
  const entry = parseEntry(row);
  return isValidPassword(entry);
};



const validPasswords = entries.reduce((accumulator, current) => {
  if (processRow(current)) {
    console.log("valid", current);
    return accumulator + 1;
  }
  console.log("invalid", current);
  return accumulator;
}, 0);

console.log("done: valid passwords ", validPasswords);
