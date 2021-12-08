module.exports = (context) => {
  const addToResponse = context.utils;
  const b = addToResponse;
  const c = b;
  c('a', 'a');
  logger('log');
  return Promise.resolve();
};
