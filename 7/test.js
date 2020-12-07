const assert = require("assert");
const {parseRule, canHoldType, parseRules, countBagsCanHoldType, countAllChildBags} = require("./lib");

const parsed1 = parseRule("dark orange bags contain 3 bright white bags, 4 muted yellow bags.");
assert(parsed1.type === "dark orange");
assert(parsed1.children.length === 2);
assert(parsed1.children[0].type === "bright white");
assert(parsed1.children[0].quantity === 3);
assert(parsed1.children[1].quantity === 4);

const parsed2 = parseRule("faded blue bags contain no other bags.");
assert(parsed2.type === "faded blue");
assert(parsed2.children.length === 0);

const testRuleInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const testRules = parseRules(testRuleInput);

assert(canHoldType("light red", "muted yellow", testRules));
assert(!canHoldType("faded blue", "light red", testRules));
assert(canHoldType("dark orange", "shiny gold", testRules));

assert(countBagsCanHoldType(testRules, "shiny gold") === 4);

assert(countAllChildBags(testRules, "shiny gold") === 32);

const testRuleInput2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

const testRules2 = parseRules(testRuleInput2);
assert(countAllChildBags(testRules2, "shiny gold") === 126);
