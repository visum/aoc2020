const assert = require("assert");
const {binaryPartition, findSeatID} = require('./lib');

assert(binaryPartition("FBFBBFF") === 44);
assert(binaryPartition("FFFBBBF") === 14);

assert(binaryPartition("RRR") === 7);
assert(binaryPartition("RLL") === 4);

assert(findSeatID("BFFFBBFRRR") === 567);
assert(findSeatID("FFFBBBFRRR") === 119);
assert(findSeatID("BBFFBBFRLL") === 820);