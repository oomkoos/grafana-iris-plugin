import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './DataSource';
import { ConfigEditor } from 'editors/ConfigEditor';
import { QueryEditor } from 'editors/QueryEditor';
import { TargetQuery } from 'types/TargetQuery';
import { DataSourceOptions } from 'types/DataSourceOptions';

export const plugin = new DataSourcePlugin<DataSource, TargetQuery, DataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
