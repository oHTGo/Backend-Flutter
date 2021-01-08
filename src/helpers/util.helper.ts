import * as _ from 'lodash';

export const errorParser = (validateErrors) => {
  return _.map(validateErrors, (item) => {
    return _.values(item.constraints)[0];
  });
};
