import SeatSimulator from "./SeatSimulator.ts";

const input = Deno.readTextFileSync("./input.txt");

const sim = new SeatSimulator();
sim.loadLayout(input);

sim.runUntilStable("nextVisible");

console.log(`When stable, there are ${sim.countSeatsWithStatus("occupied")} seats occupied`);