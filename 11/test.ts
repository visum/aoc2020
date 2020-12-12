import {assert} from "https://deno.land/std/testing/asserts.ts";
import SeatSimulator from "./SeatSimulator.ts";

const testInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

Deno.test({
  name: "runUntilStable",
  fn(): void {
    const simOne = new SeatSimulator();
    simOne.loadLayout(testInput);
    simOne.runUntilStable();
    const seatsOccupied = simOne.countOccupiedSeats();
    assert(seatsOccupied === 37);
  }
});
