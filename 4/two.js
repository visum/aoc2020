const {getPassports, validationRules, validatePassport} = require("./lib");

const process = async (inputFilePath) => {
  const passports = await getPassports(inputFilePath);
  const validCount = passports.reduce((count, passport) => {
    if(validatePassport(passport, validationRules)) {
      return count + 1;
    }
    return count;
  }, 0);

  console.log(inputFilePath, validCount);
};

process("./partTwoTestInput.txt");
process("./input.txt");