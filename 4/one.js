const inputPath = "./input.txt";
const {getPassports, tempRequiredFields, hasRequiredFields} = require("./lib");

const process = async (inputFilePath) => {
  const passports = await getPassports(inputFilePath);
  const validCount = passports.reduce((count, passport) => {
    if (hasRequiredFields(passport, tempRequiredFields)) {
      return count + 1;
    }
    return count;
  }, 0);

  console.log(inputFilePath + " Counted valid:" + validCount);
};

process("./testInput.txt");
process("./input.txt");