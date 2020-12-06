const fs = require("fs");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
const tempRequiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const parseOrDefault = (input) => {
  try {
    return parseInt(input, 10);
  } catch {
    return false;
  }
}

const validationRules = [
  {
    field: "byr",
    process: (value) => {
      const num = parseOrDefault(value);
      if (num === false){
        return false;
      }
      return num >= 1920 && num <= 2002;
    }
  },
  {
    field: "iyr",
    process: (value) => {
      const num = parseOrDefault(value);
      if (num === false){
        return false;
      }
      return num >= 2010 && num <= 2020;
    }
  },
  {
    field: "eyr",
    process: (value) => {
      const num = parseOrDefault(value);
      if (num === false){
        return false;
      }
      return num >= 2020 && num <= 2030;
    }
  },
  {
    field: "hgt",
    process: (value) => {
      const regexp = /(\d+)(cm|in)/;
      const parts = regexp.exec(value);
      if(!parts){
        return false;
      }
      const num = parseOrDefault(parts[1]);
      if(parts[2] === "in"){
        return num >= 59 && num <= 76;
      }
      if (parts[2] === "cm"){
        return num >= 150 && num <= 193;
      }
      return false;
    }
  },
  {
    field: "hcl",
    process: (value) => {
      const regexp = /^#[0-9a-f]{6}$/;
      return regexp.test(value);
    }
  },
  {
    field: "ecl",
    process: (value) => {
      const valid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      return valid.indexOf(value) > -1;
    }
  },
  {
    field: "pid",
    process: (value) => {
      const regexp = /^[\d]{9}$/;
      return regexp.test(value);
    }
  }
];

const parsePassport = (string) => {
  const normalized = string.replace(/\n/g, " ");
  const parts = normalized.split(" ");
  return parts.reduce((passport, current) => {
    const [key, value] = current.split(":");
    passport[key] = value;
    return passport;
  }, {});
};

const getPassports = async (inputPath) => {
  return new Promise((resolve) => {
    const stream = fs.createReadStream(inputPath, { encoding: "utf-8" });
    const passports = [];
    let leftover = "";
    const delimeter = /\n\n/;
    stream.on("end", () => {
      passports.push(parsePassport(leftover));
      resolve(passports);
    });
    stream.on("data", (chunk) => {
      // go through the chunk looking for \n\n, carving them off as you find them
      // when you hit the end of the chunk, put the rest in leftover
      // on the next chunk, glue the leftover on the beginning and start again
      let workingString = leftover + chunk;
      let breakLocation = workingString.search(delimeter);
      while (breakLocation != -1) {
        const piece = workingString.substring(0, breakLocation);
        passports.push(parsePassport(piece));
        workingString = workingString.substring(breakLocation + 2);
        breakLocation = workingString.search(delimeter);
      }
      leftover = workingString;
    });
  });
};

const hasRequiredFields = (passport, fields) => {
  return fields.every((field) => passport.hasOwnProperty(field));
};

const validatePassport = (passport, rules) => {
  return rules.every((rule) => {
    const value = passport[rule.field];
    return rule.process(value);
  });
};

module.exports = {
  getPassports,
  parsePassport,
  requiredFields,
  hasRequiredFields,
  tempRequiredFields,
  validatePassport,
  validationRules
};
