module.exports = (context) => {
  const { utils: otherType } = context;
  const { addToResponse: a, logger } = otherType;
  const b = a;
  const c = b;
  c('a', 'a');
  logger('log');
  return Promise.resolve();
};
