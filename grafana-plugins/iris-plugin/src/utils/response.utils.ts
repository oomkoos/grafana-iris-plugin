import { forEach, isEmpty, map, range, zip, zipObject } from 'lodash';

import { DataQueryRequest, FieldDTO, FieldType, MutableDataFrame } from '@grafana/data';

import { ResponseDataSet } from 'types/ResponseDataSet';
import { TargetQuery } from 'types/TargetQuery';
import { fillAndRescale } from 'utils/math.utils';

/*
    Different way to construct MutableDataFrame
    const frame = new MutableDataFrame({
      refId: query.refId,
      fields: [
        { name: 'Time', type: FieldType.time },
        { name: 'Value', type: FieldType.number },
      ],
    });
    frame.add({ Time: dpp[1], Value: dpp[0] });
    data.push(frame)
*/

export function getLegends(responseDataSet: ResponseDataSet): any[] {
  if (!responseDataSet || !responseDataSet.data) {
    return [];
  }

  return responseDataSet.data.legends;
}

export function buildDataFrame(
  responseDataSet: ResponseDataSet,
  options: DataQueryRequest<TargetQuery>
): MutableDataFrame[] {
  if (!responseDataSet || !responseDataSet.data || !options) {
    return [];
  }

  const values = zip(...responseDataSet.data.data);
  const valueObjects = zipObject(responseDataSet.data.legends, values);

  let timeSeries = range(responseDataSet.data.starttime, responseDataSet.data.endtime, responseDataSet.data.step);
  timeSeries = map(timeSeries, t => {
    return t * 1000;
  });

  const dataFrames: MutableDataFrame[] = [];
  forEach(options.targets, (target, i) => {
    if (isEmpty(target) || target.hide || !target.target) {
      return;
    }

    let targetValues = fillAndRescale(target, valueObjects[`${target.target}`]);

    const fields: FieldDTO[] = [];
    fields.push({
      name: 'Time',
      values: timeSeries,
      type: FieldType.time,
    });
    fields.push({
      name: options.targets[i].target || 'Value',
      values: targetValues,
      type: FieldType.number,
    });
    dataFrames.push(
      new MutableDataFrame({
        refId: target.refId,
        fields: fields,
      })
    );
  });

  return dataFrames;
}
