function syntaxChecker(text) {
  if (!text) return '';
  const bracketsRef = {
    '(': ')',
    '[': ']',
    '<': '>',
    '{': '}'
  };
  const openingBrackets = ['(', '[', '<', '{'];
  const lines = text.split('\n');
  for (line of lines) {
    const bracketOrder = [];
    for (let i = 0; i < line.length; i++) {
      if (openingBrackets.includes(line[i])) {
        bracketOrder.unshift(line[i]);
      } else if (line[i] !== bracketsRef[bracketOrder[0]]) {
        return `line ${lines.indexOf(line) + 1} expected ${
          bracketsRef[bracketOrder[0]]
        } found ${line[i]}`;
      } else bracketOrder.shift();
    }
    if (bracketOrder.length)
      return `line ${lines.indexOf(line) + 1} missing ${
        bracketsRef[bracketOrder[0]]
      }`;
  }
  return '';
}

module.exports = syntaxChecker;
