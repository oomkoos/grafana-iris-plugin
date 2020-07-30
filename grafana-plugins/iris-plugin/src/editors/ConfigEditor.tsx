import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { DataSourceOptions } from 'types/DataSourceOptions';
import { SecureJsonData } from 'types/SecureJsonData';

const { FormField, SecretFormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<DataSourceOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  onPathChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      path: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  // TODO This plugin does not have the GO backend
  //  so the username and password is NOT stored securely
  //  since secureJsonData is not accessible when the request is built
  onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      username: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        password: event.target.value,
      },
      jsonData: {
        ...options.jsonData,
        password: event.target.value,
      },
    });
  };

  onResetPassword = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        password: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        password: '',
      },
      jsonData: {
        ...options.jsonData,
        password: '',
      },
    });
  };

  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as SecureJsonData;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="URL"
            labelWidth={6}
            inputWidth={20}
            onChange={this.onPathChange}
            value={jsonData.path || ''}
            placeholder="http://cloud.dev.irisns.com/iris/api2/api/graphs/xport"
          />
        </div>

        <div className="gf-form">
          <FormField
            value={jsonData.username || ''}
            label="Username"
            placeholder="username"
            labelWidth={6}
            inputWidth={20}
            onChange={this.onUsernameChange}
          />
        </div>
        <div className="gf-form">
          <SecretFormField
            isConfigured={(secureJsonFields && secureJsonFields.password) as boolean}
            value={secureJsonData.password || ''}
            label="Password"
            placeholder="secure json field (backend only)"
            labelWidth={6}
            inputWidth={20}
            onReset={this.onResetPassword}
            onChange={this.onPasswordChange}
          />
        </div>
      </div>
    );
  }
}
