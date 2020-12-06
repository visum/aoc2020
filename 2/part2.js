const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf8" });

const entries = input.split("\n");

const entryRegexp = /(\d+)-(\d+) ([a-z]): (\w+)/i;

const parseEntry = (string) => {
  const [, min, max, char, password] = entryRegexp.exec(string);
  const result = {
    pos1: parseInt(min, 10),
    pos2: parseInt(max, 10),
    char,
    password,
  };
  return result;
};

const isValidPassword = (entry) => {
  const {pos1, pos2, char, password} = entry;

  const pos1Char = password[pos1-1];
  const pos2Char = password[pos2-1];

  const matches = (pos1Char === char) + (pos2Char === char);
  return matches === 1;
}

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
