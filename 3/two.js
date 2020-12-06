// how many trees do you encounter going right 3, down 1 over and over
// until you reach the bottom of the map?

// wow, this is tricky

const fs = require("fs");
const inputPath = "./input.txt";

// const input = fs.readFileSync("./input.txt", {encoding:"utf8"});

const createMap = function () {
  return new Promise((resolve, reject) => {
    const map = [""];
    const stream = fs.createReadStream(inputPath, { encoding: "utf-8" });
    stream.on("end", () => {
      resolve(map);
    });
    stream.on("data", (chunk) => {
      const parts = chunk.split("\n");
      // the first part is part of the last element in the map
      const firstPart = parts.shift();
      map[map.length - 1] += firstPart;
      map.push(...parts);
    });
  });
};

const getNavigator = (treeMap) => {
  let posX = 0;
  let posY = 0;
  return (dX, dY) => {
    let newX = posX + dX;
    const newY = posY + dY;
    const newRow = treeMap[newY];
    if (!newRow) {
      return null;
    }
    if (newX > newRow.length - 1) {
      newX = newX % newRow.length;
    }
    posX = newX;
    posY = newY;
    return newRow[newX];
  };
};

const countThings = (finds, char) => {
  return finds.reduce((acc, current) => {
    if (current === char) {
      acc += 1;
    }
    return acc;
  }, 0);
};

const processPath = (treeMap, [x, y]) => {
  const navigator = getNavigator(treeMap);
  const finds = [];
  let found = navigator(x, y);
  while (found) {
    finds.push(found);
    found = navigator(x, y);
  }
  const trees = countThings(finds, "#");
  return trees;
};

const process = async () => {
  const map = await createMap();
  const paths = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const grandTotal = paths.reduce((acc, current) => {
    const result = processPath(map, current);
    console.log(current, result);
    return acc * result;
  }, 1);
  console.log(grandTotal);
};

process();
