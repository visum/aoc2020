import { assert } from "https://deno.land/std/testing/asserts.ts";
import Navigator, { InstructionKey } from "./Navigator.ts";
import WaypointNavigation from "./WaypointNavigation.ts";

const testInput = `F10
N3
F7
R90
F11`;

Deno.test({
  name: "basic navigation",
  fn(): void {
    const nav = new Navigator();
    const instructions = testInput.split("\n").map(Navigator.parseInstruction);
    instructions.forEach(([instruction, value]: [InstructionKey, number]) => {
      nav.move(instruction, value);
    });
    const finalPosition = nav.manhattanPosition;
    assert(finalPosition === 25);
  }
});

Deno.test({
  name: "turning",
  fn(): void {
    const nav = new Navigator();
    // remember that the heading starts at 90
    nav.move("R", 90);
    const heading1 = nav.heading as number;
    assert(heading1 === 180, "R 90 from 90");

    nav.move("R", 270);
    const heading2 = nav.heading as number;
    assert(heading2 === 90, "R 270 from 180");

    nav.move("L", 180);
    const heading3 = nav.heading as number;
    assert(heading3 === 270, "L 180 from 90");

  }
});

Deno.test({
  name: "moving",
  fn(): void {
    const nav = new Navigator();
    nav.move("F", 10);
    assert(nav.manhattanPosition === 10, "F 10");

    nav.move("S", 10);
    assert(nav.manhattanPosition as number === 20, "S 10");

    nav.move("L", 90);
    assert(nav.manhattanPosition as number === 20, "L 90");

    nav.move("F", 5);
    assert(nav.manhattanPosition as number === 15, "F 5");

    nav.move("W", 15);
    assert(nav.manhattanPosition as number === 10, "W 15");

    nav.move("N", 5);
    assert(nav.manhattanPosition as number === 5, "N 5");
  }
})

Deno.test({
  name: "waypoint navigation",
  fn(): void {
    const nav = new WaypointNavigation(10, 1);
    const instructions = testInput.split("\n").map(WaypointNavigation.parseInstruction);
    instructions.forEach(([insruction, value]: [InstructionKey, number]) => {
      nav.move(insruction, value);
    });

    const finalPosition = nav.manhattanPosition;
    assert(finalPosition === 286);
  }
});

Deno.test({
  name: "Waypoint turning",
  fn(): void {
    const nav = new WaypointNavigation(0,0);
    nav.move("N", 10);
    nav.move("E", 5);
    assert(nav.waypointPositionX === 5, "starting position");
    assert(nav.waypointPositionY === 10, "starting position");

    nav.move("L", 90);
    assert(nav.waypointPositionX as number === -10, "Left turn X to Y");
    assert(nav.waypointPositionY as number === 5, "Left turn Y to X");

    nav.move("R", 270);
    assert(nav.waypointPositionX as number === -5, "Right turn 270 Y to X");
    assert(nav.waypointPositionY as number === -10, "Right turn 270 X to Y");

  }
})