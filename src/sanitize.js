/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const hexEncode = require('./hexEncode');
const tokenRegex = /{{([^}]+)}}/g;

module.exports = (containerString) => {
  // Replace tokens first: {{name}} => getDataElementValue(name)
  // We don't add quotes around the name because we don't know
  // if the token is used in a double quoted string or not.
  const sanitizedString = containerString.replace(
    tokenRegex,
    (match, dataElementName) =>
      match.replace(
        `{{${dataElementName}}}`,
        `getDataElementValue(reactor${hexEncode(dataElementName)})`
      )
  );

  return sanitizedString;
};
