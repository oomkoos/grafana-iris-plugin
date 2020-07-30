import { DataQueryRequest, DataSourceInstanceSettings, dateTime } from '@grafana/data';

import { TargetQuery } from 'types/TargetQuery';
import { DataSourceOptions } from 'types/DataSourceOptions';

export function getDummyOptions(): DataQueryRequest<TargetQuery> {
  let now = new Date();
  let fiveHoursAgo = new Date();
  fiveHoursAgo.setHours(fiveHoursAgo.getHours() - 5);

  // prettier-ignore
  return {
    'app': 'dashboard',
    'requestId': 'Q102',
    'timezone': 'browser',
    'panelId': 23763571993,
    'dashboardId': 5,
    'range': {
      'from': dateTime(fiveHoursAgo.toISOString()),
      'to': dateTime(now.toISOString()),
      'raw': { 'from': 'now-5h', 'to': 'now' }
    },
    'timeInfo': '',
    'interval': '30s',
    'intervalMs': 30000,
    'targets': [{
      'basetag': 'pts03.wdh15.na.paratustelco.localnet__BitsByShaperYursatNetworkStorage',
      'gdef': 'sandvineMeasurementsTraffic',
      'refId': 'A',
      'target': 'Traffic',
      'targetOptions': [{ 'label': 'Traffic', 'value': 'Traffic' }],
      'datasource': 'grafana-iris-plugin'
    }],
    'maxDataPoints': 687,
    'scopedVars': {
      '__interval': { 'text': '30s', 'value': '30s' },
      '__interval_ms': { 'text': '30000', 'value': 30000 }
    },
    'startTime': now.getTime(),
    'rangeRaw': { 'from': 'now-5h', 'to': 'now' }
  };
}

export function constructRequestUrl(
  options: DataQueryRequest<TargetQuery>,
  settings: DataSourceInstanceSettings<DataSourceOptions>
): URL | undefined {
  const host = settings.jsonData.path;
  const gdef = options.targets[0].gdef;
  const basetag = options.targets[0].basetag;
  const starttime = options.range.from.unix();
  const endtime = options.range.to.unix();

  if (!host || !gdef || !basetag || !starttime || !endtime) {
    console.error('Error constructing request URL', host, gdef, basetag, starttime, endtime);

    return;
  }

  return new URL(`${host}?gdef=${gdef}&basetag=${basetag}&starttime=${starttime}&endtime=${endtime}`);
}
