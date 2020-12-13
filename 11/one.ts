import SeatSimulator from "./SeatSimulator.ts";

const seatLayout = Deno.readTextFileSync("./input.txt");

const simulator = new SeatSimulator();
simulator.loadLayout(seatLayout);

simulator.runUntilStable("adjacent");

const occupiedWhenStable = simulator.countSeatsWithStatus("occupied");

console.log(`When stable, there are ${occupiedWhenStable} seats occupied`);
