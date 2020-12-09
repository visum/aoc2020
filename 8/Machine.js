// a virtual machine
class Machine {
  constructor() {
    this.accumulator = 0;
    this.instructionIndex = 0;
    this.trail = [];
    this.program = null;
  }

  load(source) {
    // each line is represented as a tuple [instruction, parameter]
    this.program = source.split("\n").map((line) =>
      line.split(" ").map((part, index) => {
        if (index === 1) {
          return parseInt(part, 10);
        }
        return part;
      })
    );
  }

  run() {
    if (!this.program) {
      throw new Error("No program is loaded");
    }
    let nextInstruction = this.program[0];
    while (nextInstruction) {
      this.step();
      nextInstruction = this.program[this.instructionIndex] || false;
    }
    return this.accumulator;
  }

  step() {
    if (this.trail.includes(this.instructionIndex)) {
      const recentInstructions = this.trail.slice(-5);
      recentInstructions.push(this.instructionIndex);
      const stackTrace = recentInstructions
        .map((line) => {
          const instruction = this.program[line];
          return `${line}: ${instruction[0]} ${instruction[1]}`;
        })
        .join("\n");
      throw new Error(
        `Loop detected. Multiple executions detected of index ${this.instructionIndex}. \nAcc: ${this.accumulator}. \n\n${stackTrace}`
      );
    }
    const [instruction, argument] = this.program[this.instructionIndex];
    this.trail.push(this.instructionIndex);
    this[instruction](argument);
  }

  reset() {
    this.accumulator = 0;
    this.instructionIndex = 0;
    this.trail = [];
  }

  // instructions the machine knows
  acc(arg) {
    this.accumulator += arg;
    this.instructionIndex += 1;
  }

  nop() {
    this.instructionIndex += 1;
  }

  jmp(arg) {
    this.instructionIndex += arg;
  }
}

module.exports = Machine;
