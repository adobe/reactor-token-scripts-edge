module.exports = ({ utils }) => {
  const { addToResponse: a, logger } = utils;
  a('a', 'a');
  logger('log');
  return Promise.resolve();
};
