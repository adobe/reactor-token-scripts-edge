module.exports = ({ utils: { addToResponse: c } }) => {
  c('a', 'a');
  return Promise.resolve();
};
