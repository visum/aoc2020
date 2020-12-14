import {InstructionKey} from "./Navigator.ts";

export default class WaypointNavigation {
  static parseInstruction(input: string): [InstructionKey, number] {
    const instruction = input.substr(0,1) as InstructionKey;
    const value = parseInt(input.substr(1), 10);
    return [instruction, value];
  }

  // North and East are positive
  waypointPositionX:number = 0;
  waypointPositionY:number = 0;

  constructor(startX: number, startY: number) {
    this.waypointPositionX = startX;
    this.waypointPositionY = startY;
  }

  shipPositionX:number = 0;
  shipPositionY:number = 0;

  get manhattanPosition() {
    return Math.abs(this.shipPositionX) + Math.abs(this.shipPositionY);
  }

  goNorth(value: number) {
    this.waypointPositionY += value;
  }

  goEast(value: number) {
    this.waypointPositionX += value;
  }

  goSouth(value: number) {
    this.waypointPositionY -= value;
  }

  goWest(value: number) {
    this.waypointPositionX -= value;
  }

  turnRight(value: number) {
    const rotations = value / 90;
    if (rotations % 4 === 0) {
      return;
    }
    const oldX = this.waypointPositionX;
    const oldY = this.waypointPositionY;
    if (rotations === 1) {  
      this.waypointPositionX = oldY;
      this.waypointPositionY = -oldX;
    }
    if (rotations === 2) {
      this.waypointPositionX = -oldX;
      this.waypointPositionY = -oldY;
    }
    if (rotations === 3) {
      this.waypointPositionX = -oldY;
      this.waypointPositionY = oldX;
    }
  }

  turnLeft(value: number) {
    if (value === 90) {
      return this.turnRight(270);
    }
    if (value === 270) {
      return this.turnRight(90);
    }
    return this.turnRight(value);
  }

  goForward(iterations: number) {
    this.shipPositionX += (this.waypointPositionX * iterations);
    this.shipPositionY += (this.waypointPositionY * iterations);
  }

  move(instruction: InstructionKey, value: number) {
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
      }
    }
  }
}