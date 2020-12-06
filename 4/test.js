const assert = require("assert");
const {getPassports, parsePassport, hasRequiredFields, requiredFields} = require("./lib");

const testPassportString = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`;

const passport = parsePassport(testPassportString);

assert(passport.ecl === "gry");
assert(passport.hgt === "183cm");

getPassports("./testInput.txt").then(passports => {
  assert(passports.length === 4);
  assert(passports[2].pid === "760753108");

  assert(hasRequiredFields(passports[0], requiredFields));
  assert(!hasRequiredFields(passports[1], requiredFields));
})

