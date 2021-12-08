module.exports = ({ arc, utils }) => {
  const ruleStash = arc.ruleStash || {};
  const coreRuleStash = ruleStash.core || {};
  coreRuleStash.customCode = coreRuleStash.customCode || {};

  const settings = utils.getSettings();
  const x = utils.addToResponse;
  x('a', 'a');

  return Promise.resolve(settings.source(arc, utils)).then((r) => {
    coreRuleStash.customCode[settings.keyName] = r;
    return coreRuleStash;
  });
};
