const assert = require("assert");
const Machine = require("./Machine");
const ProgramFixer = require("./ProgramFixer");

const source = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const machine = new Machine();
machine.load(source);
assert(machine.program[0][0] === "nop");
assert(machine.program[0][1] === 0);
assert(machine.program[4][1] === -3);

machine.step();
assert(machine.instructionIndex === 1);
machine.step();
assert(machine.accumulator === 1);
machine.step();
assert(machine.instructionIndex === 6);

machine.reset();

let loopDetected = false;
try {
  machine.run();
} catch (e){
  console.error(e);
  assert(machine.accumulator === 5);
  loopDetected = true;
}

assert(loopDetected);

const programFixer = new ProgramFixer(source);

assert(programFixer.run() === 8);
