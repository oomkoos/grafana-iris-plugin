import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';

import { fetchResource } from 'utils/api.utils';
import { TargetQuery } from 'types/TargetQuery';
import { DataSourceOptions } from 'types/DataSourceOptions';
import { buildDataFrame } from 'utils/response.utils';
import { constructRequestUrl, getDummyOptions } from 'utils/request.utils';
import { store } from 'utils/response.store';

export class DataSource extends DataSourceApi<TargetQuery, DataSourceOptions> {
  constructor(private instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
    super(instanceSettings);
    store.set('Settings', instanceSettings); // informational
  }

  async query(options: DataQueryRequest<TargetQuery>): Promise<DataQueryResponse> {
    store.set('Options', options); // informational
    const requestUrl = constructRequestUrl(options, this.instanceSettings);
    const response = await fetchResource(requestUrl, this.instanceSettings);
    const data = buildDataFrame(response, options);

    return { data };
  }

  // Implement a health check for your data source.
  async testDatasource() {
    const { path, username, password } = this.instanceSettings.jsonData;
    if (!path || !username || !password) {
      return {
        status: 'fail',
        message: 'Please enter a URL, username and password',
      };
    }

    const requestUrl = constructRequestUrl(getDummyOptions(), this.instanceSettings);
    const response = await fetchResource(requestUrl, this.instanceSettings);

    if (!response || !response.data) {
      return {
        status: 'fail',
        message: 'No valid response',
      };
    }

    return {
      status: 'success',
      message: 'Success, ready to go!',
    };
  }
}
