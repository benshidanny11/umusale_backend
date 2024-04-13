/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';

export const getPagination = (page, size) => {
  const limit = size || 20;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};
