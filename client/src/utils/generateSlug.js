// eslint-disable-next-line import/prefer-default-export
export const generateSlug = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-');
