const { syntaxChecker, fullSyntaxChecker } = require('./syntax-checker');

describe('syntaxChecker', () => {
  it('should return an empty string if passed a string containing no errors in any line', () => {
    expect(syntaxChecker()).toBe('');
    expect(syntaxChecker('()')).toBe('');
    expect(syntaxChecker('[()]')).toBe('');
    expect(
      syntaxChecker(`([])
()
[]`)
    ).toBe('');
  });

  it('should return a string containing line 1 and the error when passed a failing single line input with single corruption', () => {
    expect(syntaxChecker('(]')).toBe('line 1 expected ) found ]');
    expect(syntaxChecker('{()()()>')).toBe('line 1 expected } found >');
    expect(syntaxChecker('<([]){()}[{}])')).toBe('line 1 expected > found )');
    expect(syntaxChecker('(((()))}')).toBe('line 1 expected ) found }');
  });

  it('should return a string containing line (number) and the error when passed a failing multi line input with single corruption', () => {
    expect(
      syntaxChecker(`([])
(]`)
    ).toBe('line 2 expected ) found ]');
    expect(
      syntaxChecker(`([])
()
[]
{]}`)
    ).toBe('line 4 expected } found ]');
  });

  it('should return a string containing line (number) and the error for the first instance when passed a failing multi line input with multiple corruptions', () => {
    expect(
      syntaxChecker(`([])
(]
	{]}`)
    ).toBe('line 2 expected ) found ]');
    expect(
      syntaxChecker(`([])
()
[]
{]}
{)}`)
    ).toBe('line 4 expected } found ]');
  });

  it('should return a string containing line 1 and the error when passed a failing single line input with single incompletion', () => {
    expect(syntaxChecker('([]')).toBe('line 1 missing )');
  });

  it('should return a string containing line (number) and the error when passed a failing multi line input with single incompletion', () => {
    expect(
      syntaxChecker(`([])
([]`)
    ).toBe('line 2 missing )');
  });

  it('should return a string containing line (number) and the error for the first instance when passed a failing multi line input with multiple incompletions', () => {
    expect(
      syntaxChecker(`([])
({})
{`)
    ).toBe('line 3 missing }');
  });
});

describe('fullSyntaxChecker', () => {
  it('should return an array containing a single empty string if passed correct data', () => {
    expect(fullSyntaxChecker(`()`)).toEqual([]);
  });
  it('should return a full log of all present incompletions and corruptions', () => {
    expect(
      fullSyntaxChecker(`([]
(]
{()()()>
<([{}`)
    ).toEqual([
      'line 1 missing )',
      'line 2 expected ) found ]',
      'line 2 missing )',
      'line 3 expected } found >',
      'line 3 missing }',
      'line 4 missing >'
    ]);
  });
});
