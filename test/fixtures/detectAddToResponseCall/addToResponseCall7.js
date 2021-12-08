module.exports = (context) => {
  const {
    utils: { addToResponse: a, logger }
  } = context;
  const b = a;
  const c = b;
  c('a', 'a');
  logger('log');
  return Promise.resolve();
};
