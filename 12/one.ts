import Navigator from "./Navigator.ts";

const input = Deno.readTextFileSync("./input.txt");

const insructions = input.split("\n").map(Navigator.parseInstruction);

const nav = new Navigator();

insructions.forEach(([instruction, value]) => nav.move(instruction, value));

console.log(`The final position of the ferry is ${nav.manhattanPosition}`);