const generateSlug = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-');

module.exports = generateSlug;
