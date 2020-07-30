import { DataSourceJsonData } from '@grafana/data';

/**
 * These are options configured for each DataSource instance
 */
export interface DataSourceOptions extends DataSourceJsonData {
  path?: string;
  username?: string;
  password?: string;
}
