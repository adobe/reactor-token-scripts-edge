module.exports = ({ utils: { addToResponse: a, logger } }) => {
  a('a', 'a');
  logger('log');
  return Promise.resolve();
};
