import { defaults, map } from 'lodash';
import React, { ChangeEvent, PureComponent } from 'react';

import { LegacyForms, Select, Switch } from '@grafana/ui';
import { DataSourceInstanceSettings, QueryEditorProps, SelectableValue } from '@grafana/data';

import { DataSource } from 'DataSource';
import { defaultQuery, TargetQuery } from 'types/TargetQuery';
import { DataSourceOptions } from 'types/DataSourceOptions';
import { getLegends } from 'utils/response.utils';
import { store } from 'utils/response.store';
import { basetagOptions, gdefOptions } from 'utils/options.utils';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, TargetQuery, DataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
  }

  onTargetChange = (event: SelectableValue<string>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, target: event?.value || '' });
    onRunQuery();
  };

  onBaseTagChange = (event: SelectableValue<string>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, basetag: event?.value || '' });
    onRunQuery();
  };

  onGdefChange = (event: SelectableValue<string>) => {
    store.clear('Response');
    const { onChange, query } = this.props;
    const value = { ...query, gdef: event?.value || '', target: '', basetag: '' };
    onChange(value);
  };

  onScaleIndexChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, scaleIndex: event.target.value });
    onRunQuery();
  };

  onFillChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, fill: event.target.value === 'on' ? true : false });
    event.target.value = event.target.value === 'on' ? 'off' : 'on';
    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const settings: DataSourceInstanceSettings<DataSourceOptions> = store.get('Settings');
    const legends = getLegends(store.get('Response'));
    query.targetOptions = map(legends, name => {
      return { label: name, value: name };
    });

    return (
      <div className="gf-form-group">
        {query.refId !== 'A' || (
          <div className="gf-form-inline">
            <div className="gf-form ">
              <label className="gf-form-label width-8">FROM</label>
              <span className="dropdown">
                <span className="tight-form-item tight-form-func">{settings.jsonData.path}</span>
              </span>
            </div>
          </div>
        )}
        {query.refId !== 'A' || (
          <div className="gf-form-inline">
            <div className="gf-form">
              <label className="gf-form-label width-8">WHERE gdef =</label>
              <span className="dropdown">
                <span className="tight-form-item tight-form-func">
                  <Select
                    value={query.gdef || ''}
                    options={gdefOptions}
                    disabled={query.refId !== 'A'}
                    maxMenuHeight={200}
                    placeholder={'gdef'}
                    noOptionsMessage={'No options found'}
                    isMulti={false}
                    isClearable={true}
                    menuPlacement={'bottom'}
                    onChange={this.onGdefChange}
                  />
                </span>
              </span>
            </div>
            <div className="gf-form">
              <label className="gf-form-label width-8">AND basetag =</label>
              <span className="dropdown">
                <span className="tight-form-item tight-form-func">
                  <Select
                    value={query.basetag || ''}
                    options={basetagOptions.get(query.gdef)}
                    placeholder={'basetag'}
                    disabled={query.refId !== 'A'}
                    maxMenuHeight={200}
                    noOptionsMessage={'No options found'}
                    isMulti={false}
                    isClearable={true}
                    menuPlacement={'bottom'}
                    onChange={this.onBaseTagChange}
                  />
                </span>
              </span>
            </div>
          </div>
        )}
        <div className="gf-form-inline">
          <div className="gf-form ">
            <label className="gf-form-label width-8">SELECT</label>
            <span className="dropdown">
              <span className="tight-form-item tight-form-func">
                <Select
                  value={query.target || ''}
                  options={query.targetOptions}
                  placeholder={'select a target'}
                  maxMenuHeight={200}
                  noOptionsMessage={'No options found'}
                  isMulti={false}
                  isClearable={true}
                  menuPlacement={'bottom'}
                  onChange={this.onTargetChange}
                />
              </span>
            </span>
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form ">
            <span className="tight-form-item tight-form-func">
              <FormField
                labelWidth={8}
                inputWidth={6}
                value={query.scaleIndex || ''}
                onChange={this.onScaleIndexChange}
                label="Math()"
                tooltip="Re-scale the target eg: '*10', '/1024', '+333' etc"
              />
            </span>
          </div>
        </div>
        <div className="gf-form ">
          <label className="gf-form-label width-8">fill()</label>
          <span className="tight-form-item tight-form-func">
            <Switch value={query.fill} onChange={this.onFillChange} />
          </span>
        </div>
      </div>
    );
  }
}
