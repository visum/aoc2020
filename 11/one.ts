import SeatSimulator from "./SeatSimulator.ts";

const seatLayout = Deno.readTextFileSync("./input.txt");

const simulator = new SeatSimulator();
simulator.loadLayout(seatLayout);

simulator.runUntilStable();
simulator.step();
simulator.step();

const occupiedWhenStable = simulator.countOccupiedSeats();

console.log(`When stable, there are ${occupiedWhenStable} seats occupied`);
