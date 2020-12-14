import WaypointNavigation from "./WaypointNavigation.ts";

const input = Deno.readTextFileSync("./input.txt");

const instructions = input.split("\n").map(WaypointNavigation.parseInstruction);

const nav = new WaypointNavigation(10,1);

instructions.forEach(([instruction, value]) => nav.move(instruction, value));

console.log(`The final manhattanPosition of the ship is ${nav.manhattanPosition}`);

// The answer is not 62389
