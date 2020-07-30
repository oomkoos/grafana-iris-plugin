import { get, head, indexOf, isEmpty, map } from 'lodash';
import { TargetQuery } from 'types/TargetQuery';

export function fillAndRescale(
  targetQuery: TargetQuery,
  targetValues: Array<number | undefined>
): Array<number | undefined> {
  if (isEmpty(targetValues)) {
    return targetValues;
  }

  return fill(targetQuery.fill, rescale(targetQuery.scaleIndex, targetValues));
}

function fill(fill: boolean | undefined, targetValues: Array<number | undefined>): Array<number | undefined> {
  if (!fill || isEmpty(targetValues)) {
    return targetValues;
  }

  let previousVal: number | undefined = 0;
  return map(targetValues, targetValue => {
    // always consider how long this takes
    previousVal = targetValue ? targetValue : previousVal;
    return previousVal;
  });
}

function rescale(scaleIndex: string | undefined, targetValues: Array<number | undefined>): Array<number | undefined> {
  if (!scaleIndex || isEmpty(targetValues)) {
    return targetValues;
  }

  const operator: string = get(head(scaleIndex), [0], '');
  const scaleValueString = scaleIndex?.replace(operator, '');
  const scaleValue = parseFloat(scaleValueString);
  if (indexOf(['*', '-', '+', '/'], operator) > -1) {
    return map(targetValues, targetValue => {
      return targetValue ? doCalculation(targetValue, operator, scaleValue) : targetValue;
      // TODO eval can be harmful, so could use some math parser
      // return targetValue ? eval(`${targetValue}${operator}${scaleValue}`) || targetValue : targetValue;
    });
  }

  return targetValues;
}

function doCalculation(targetValue: number, operator: string, scaleValue: number): number {
  if (!targetValue || !operator || !scaleValue) {
    return targetValue;
  }

  if ('*' === operator) {
    return targetValue * scaleValue;
  }
  if ('/' === operator && scaleValue > 0) {
    return targetValue / scaleValue;
  }
  if ('+' === operator) {
    return targetValue + scaleValue;
  }
  if ('-' === operator) {
    return targetValue - scaleValue;
  }

  return targetValue;
}
