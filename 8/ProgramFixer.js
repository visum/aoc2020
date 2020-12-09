const Machine = require("./Machine");

class ProgramFixer {
  constructor(program) {
    this.machine = new Machine();
    this.machine.load(program);
    this.originalProgram = this.machine.program.slice(0);
    this.lastModificationIndex = this.originalProgram.length - 1;
  }

  run() {
    let programResult = this.iterate();
    while(!programResult) {
      programResult = this.iterate();
    }
    console.log(`Repaired the program. Changed line ${this.lastModificationIndex}. Originally: ${this.originalProgram[this.lastModificationIndex]}`);
    return programResult;
  }

  iterate() {
    let result = null;

    const modifiedProgram = this.modifyProgram(this.originalProgram, this.lastModificationIndex);
    try {
      this.machine.reset();
      this.machine.program = modifiedProgram;
      result = this.machine.run();
    } catch {
      // program failed to run
    }
    return result;
  }

  modifyProgram(program) {
    // start at the end, work backward to find jmp, nop
    // and swap it
    const modifiedProgram = program.slice(0);
    for(let i = this.lastModificationIndex - 1; i >= 0; i--) {
      const [instruction, arg] = modifiedProgram[i];
      if (instruction === "jmp") {
        modifiedProgram[i] = ["nop", arg];
        this.lastModificationIndex = i;
        return modifiedProgram;
      }
      if (instruction === "nop") {
        modifiedProgram[i] = ["jmp", arg];
        this.lastModificationIndex = i;
        return modifiedProgram;
      }
    }
    throw new Error("Reached the beinning of the program without modifying anything");
  }
}

module.exports = ProgramFixer;