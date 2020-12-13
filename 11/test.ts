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

const adjacentStrategyFinalState = `#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##`;

const nextVisibleStrategyFinalState = `#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#`;

Deno.test({
  name: "adjacent strategy",
  fn(): void {
    const simOne = new SeatSimulator();
    simOne.loadLayout(testInput);
    simOne.runUntilStable("adjacent");
    const seatsOccupied = simOne.countSeatsWithStatus("occupied");
    assert(seatsOccupied === 37);
    const finalState = simOne.serialize();
    assert(finalState === adjacentStrategyFinalState);
  }
});

Deno.test({
  name: "next visible seeking strategy",
  fn(): void {
    const sim1 = new SeatSimulator();
    
    sim1.loadLayout(`###
###
###`);

    assert(sim1.findSeatInDirection([1,1], [-1,-1]) === "occupied");
    assert(sim1.findSeatInDirection([1,1], [-1, 0]) === "occupied");
    assert(sim1.findSeatInDirection([1,1], [-1, 1]) === "occupied");
    assert(sim1.findSeatInDirection([1,1], [0,-1]) === "occupied");
    assert(sim1.findSeatInDirection([1,1], [0,1]) === "occupied");
    assert(sim1.findSeatInDirection([1,1], [1,-1]) === "occupied");
    assert(sim1.findSeatInDirection([1,1], [1,0]) === "occupied");
    assert(sim1.findSeatInDirection([1,1], [1,1]) === "occupied");

    const sim2 = new SeatSimulator();
    sim2.loadLayout(`LLLLLLL
L.....L
L.....L
L..#..L
L.....L
L.....L
LLLLLLL`);

    assert(sim2.findSeatInDirection([3,3], [-1,-1]) === "available", "NE");
    assert(sim2.findSeatInDirection([3,3], [-1, 0]) === "available", "N");
    assert(sim2.findSeatInDirection([3,3], [-1, 1]) === "available", "NW");
    assert(sim2.findSeatInDirection([3,3], [0,-1]) === "available", "W");
    assert(sim2.findSeatInDirection([3,3], [0,1]) === "available", "E");
    assert(sim2.findSeatInDirection([3,3], [1,-1]) === "available", "SE");
    assert(sim2.findSeatInDirection([3,3], [1,0]) === "available", "S");
    assert(sim2.findSeatInDirection([3,3], [1,1]) === "available", "SW");

  }
});

Deno.test({
  name: "next visible strategy",
  fn(): void {
    const sim = new SeatSimulator();
    sim.loadLayout(testInput);
    sim.runUntilStable("nextVisible");
    const seatsOccupied = sim.countSeatsWithStatus("occupied");
    assert(seatsOccupied === 26);
    const finalState = sim.serialize();
    assert(finalState === nextVisibleStrategyFinalState);
  }
});