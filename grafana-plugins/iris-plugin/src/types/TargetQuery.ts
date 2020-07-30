import { DataQuery, SelectableValue } from '@grafana/data';

export interface TargetQuery extends DataQuery {
  /*
   * The name of the target used to look it up at service api
   */
  target?: string;
  // type: 'timeserie' | 'table';
  // constant?: number;

  // iris
  gdef: string;
  basetag: string;
  // basetag: string;
  targetOptions: SelectableValue[];

  // legends: string[];

  // form fields
  endpoint?: string;
  fill?: boolean;
  scaleIndex?: string;
}

export const defaultQuery: Partial<TargetQuery> = {
  // type: 'timeserie',
  // gdef: 'sandvineMeasurementsTraffic',
  // basetag: 'pts03.wdh15.na.paratustelco.localnet__BitsByShaperYursatNetworkStorage',
};
