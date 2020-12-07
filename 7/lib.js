const leafRule = /^([a-z ]+) bags contain no other bags.$/i;
const rule = /^([\w]+ [\w]+) bags contain (\d.+)\.$/i;
const childRule = /([\d]{1,2}) ([\w]+ [\w]+) bags?/i;

const parseRule = (input) => {
  const leafRuleMatch = leafRule.exec(input);
  if (leafRuleMatch) {
    return { type: leafRuleMatch[1], children: [] };
  }
  const ruleMatch = rule.exec(input);
  if (ruleMatch) {
    const type = ruleMatch[1];
    const children = ruleMatch[2].split(", ").map((child) => {
      const parts = childRule.exec(child);
      return { type: parts[2], quantity: parseInt(parts[1], 10) };
    });
    return { type, children };
  }
  console.warn("Could not match a rule: ", input);
};

const parseRules = (input) => {
  return input
    .split("\n")
    .map(parseRule)
    .reduce((dict, current) => {
      dict[current.type] = current;
      return dict;
    }, {});
};

const canHoldType = (testTypeName, heldTypeName, rules) => {
  const testType = rules[testTypeName];
  if (testType.children.length === 0) {
    return false;
  }
  return testType.children.some((child) => {
    if (child.type === heldTypeName) {
      return true;
    }
    return canHoldType(child.type, heldTypeName, rules);
  });
};

const countBagsCanHoldType = (rules, type) => {
  return Object.keys(rules).reduce((sum, rule) => {
    if (canHoldType(rule, type, rules)) {
      return sum + 1;
    }
    return sum;
  }, 0);
};

const countAllChildBags = (rules, type) => {
  const rule = rules[type];
  if (rule.children.length === 0) {
    return 0;
  }

  return rule.children.reduce((sum, childInfo) => {
    return (
      sum +
      childInfo.quantity +
      childInfo.quantity * countAllChildBags(rules, childInfo.type)
    );
  }, 0);
};

module.exports = {
  parseRule,
  parseRules,
  canHoldType,
  parseRules,
  countBagsCanHoldType,
  countAllChildBags,
};
