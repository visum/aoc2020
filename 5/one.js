const {findSeatID} = require("./lib");
const fs = require("fs");

const process = async () => {
  const input = fs.readFileSync("./input.txt", {encoding:"utf-8"});
  const rows = input.split("\n");

  let highest = rows.reduce((highest, current) => {
    const thisSeatID = findSeatID(current);
    console.log(current, thisSeatID);
    if (thisSeatID > highest){
      return thisSeatID;
    }
    return highest;
  }, 0);

  console.log("This highest seatID is", highest);
}

process();