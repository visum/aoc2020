const fs = require("fs");
const {findSeatID} = require("./lib");

const input = fs.readFileSync("./input.txt", {encoding: "utf-8"});

const ids = input.split("\n").map(item => findSeatID(item)).sort((a, b) => a - b);

const gaps = [];

ids.forEach((item, index) => {
  if (index === 0) {
    return;
  }
  const last = ids[index - 1];
  if (item - last !== 1) {
    console.log(`Gap found at index ${index}: ${last}, ${item}`);
    console.log(`My Seat ID is ${item - 1}`);
  }
});

