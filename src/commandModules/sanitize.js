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

const fs = require('fs');
const sanitize = require('../sanitize');

exports.command = 'sanitize';

exports.describe =
  'Replaces {{data_element_name}} tokens to getDataElementValue(data_element_name). Then ' +
  'searches for all data element names and encodes special characters in a way that ' +
  'Babel will accept the code. ';

exports.builder = (yargs) =>
  yargs
    .option('filePath', {
      describe: 'container.js file path',
      demandOption: true,
      type: 'string',
    })
    .option('outPath', {
      describe: 'save the sanitized content to a new file path',
      type: 'string',
    })
    .example('$0 --filePath <path>', 'Returns the sanitized JS code to output.')
    .example(
      '$0 --filePath <path> --outPath <path>',
      'Saves the sanitized JS code to a new path.'
    );

exports.handler = (argv) => {
  const content = fs.readFileSync(argv.filePath, 'utf8');
  const result = sanitize(content);

  if (!argv.outPath) {
    console.log(result);
  } else {
    fs.writeFileSync(argv.outPath, result);
  }
};
