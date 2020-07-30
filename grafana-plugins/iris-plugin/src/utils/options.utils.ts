import { filter, map, uniq } from 'lodash';

import { SelectableValue } from '@grafana/data';

import { basetagPerGdef } from 'constants/basetag-gdef-relation.constants';

export const gdefOptions: SelectableValue[] = map(uniq(map(basetagPerGdef, o => o.name)), o => {
  return { label: o, value: o };
});

export const basetagOptions = {
  get: (gdef: string): SelectableValue[] => {
    return map(filter(basetagPerGdef, ['name', gdef]), o => {
      return { label: o.value, value: o.value };
    });
  },
};
