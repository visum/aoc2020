const binaryPartition = (string) => {
  let top = (2 << (string.length - 1)) - 1;
  let bottom = 0;
  for (let i = 0; i < string.length; i++){
    const char = string[i];
    const range = top - bottom + 1;
    const half = range / 2;
    if (char === "F" || char === "L"){
      // keep the lower half of the range
      top = bottom + half - 1;
    } else if (char === "B" || char === "R"){
      // keep the upper half of the range
      bottom = bottom + half;
    }
  }

  return top;
};

const findSeatID = (string) => {
  const rowString = string.substring(0,7);
  const columnString = string.substring(7);
  const rowNumber = binaryPartition(rowString)
  const columnNumber = binaryPartition(columnString);
  return rowNumber * 8 + columnNumber;
}

module.exports = {binaryPartition, findSeatID};