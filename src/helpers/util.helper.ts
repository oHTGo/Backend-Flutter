import * as lodash from 'lodash';

export const errorParser = (validateErrors) => {
  return lodash.map(validateErrors, (item) => {
    return lodash.values(item.constraints)[0];
  });
};
