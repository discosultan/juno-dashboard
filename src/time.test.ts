import {
  DAY_MS,
  MIN_MS,
  SEC_MS,
  strfinterval,
  strpinterval,
  strftimestamp,
  strptimestamp,
} from './time';

it('strfinterval', () => {
  const inputsExpectedOutputs: [number, string][] = [
    [DAY_MS * 2, '2d'],
    [123, '123ms'],
    [1234, '1s234ms'],
    [0, '0ms'],
  ];
  for (const [input, expectedOutput] of inputsExpectedOutputs) {
    expect(strfinterval(input)).toStrictEqual(expectedOutput);
  }
});

it('strpinterval', () => {
  const inputsExpectedOutputs: [string, number][] = [
    ['1d', DAY_MS],
    ['2d', DAY_MS * 2],
    ['1s1ms', SEC_MS + 1],
    ['1m1s', MIN_MS + SEC_MS],
  ];
  for (const [input, expectedOutput] of inputsExpectedOutputs) {
    expect(strpinterval(input)).toStrictEqual(expectedOutput);
  }
});

it('strftimestamp', () => {
  const inputsExpectedOutputs: [number, string][] = [
    [1546300800000, '2019-01-01T00:00:00.000Z'],
  ];
  for (const [input, expectedOutput] of inputsExpectedOutputs) {
    expect(strftimestamp(input)).toStrictEqual(expectedOutput);
  }
});

it('strptimestamp', () => {
  const inputsExpectedOutputs: [string, number][] = [
    ['2019-01-01', 1546300800000],
  ];
  for (const [input, expectedOutput] of inputsExpectedOutputs) {
    expect(strptimestamp(input)).toStrictEqual(expectedOutput);
  }
});
