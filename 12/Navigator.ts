export type CardinalDirection = "N" | "E" | "S" | "W";
export type InstructionKey = "N" | "E" | "S" | "W" | "L" | "R" | "F";

export default class Navigator {
  static parseInstruction(input: string): [InstructionKey, number] {
    const instruction = input.substr(0,1) as InstructionKey;
    const value = parseInt(input.substr(1), 10);
    return [instruction, value];
  }

  // North and East are positive
  positionX:number = 0;
  positionY:number = 0;
  heading:number = 90;

  get cardinalDirection():CardinalDirection {
    const _heading = this.heading as 0 | 90 | 180 | 270;

    if (_heading === 0){
      return "N";
    }
    if (_heading === 90) {
      return "E";
    }
    if (_heading === 180) {
      return "S";
    }
    if (_heading === 270) {
      return "W";
    }
    throw new Error(`The headering ${_heading} doesn't make sense`);
  }

  get manhattanPosition():number {
    return Math.abs(this.positionX) + Math.abs(this.positionY);
  }

  move(instruction:InstructionKey, value:number) {
    switch(instruction) {
      case "N": {
        this.goNorth(value);
        break;
      }
      case "E": {
        this.goEast(value);
        break;
      }
      case "S": {
        this.goSouth(value);
        break;
      }
      case "W": {
        this.goWest(value);
        break;
      }
      case "L": {
        this.turnLeft(value);
        break;
      }
      case "R": {
        this.turnRight(value);
        break;
      }
      case "F": {
        this.goForward(value);
        break;
      }
    }
  }

  goNorth(value: number) {
    this.positionY += value;
  }

  goSouth(value: number) {
    this.positionY -= value;
  }

  goEast(value: number) {
    this.positionX += value;
  }

  goWest(value: number) {
    this.positionX -= value;
  }

  turnRight(value: number) {
    this.heading += value;
    if (this.heading >= 360) {
      this.heading = this.heading % 360;
    }
  }

  turnLeft(value: number) {
    this.heading -= value;
    if (this.heading < 0) {
      this.heading = this.heading + 360;
    }
  }

  goForward(value: number) {
    const direction = this.cardinalDirection;
    this.move(direction, value);
  }
}