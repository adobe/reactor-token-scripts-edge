module.exports = function ({ utils: otherType }) {
  const { addToResponse: a, logger } = otherType;
  a('a', 'a');
  logger('log');
  return Promise.resolve();
};
