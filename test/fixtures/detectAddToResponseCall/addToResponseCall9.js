module.exports = (context) => {
  const a = context.utils.addToResponse;
  const b = a;
  const c = b;
  c('a', 'a');
  logger('log');
  return Promise.resolve();
};
