module.exports = ({ utils: { addToResponse } }) => {
  addToResponse('a', 'a');
  return Promise.resolve();
};
