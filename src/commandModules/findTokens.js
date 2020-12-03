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

const findTokens = require('../findTokens');

exports.command = 'findTokens';

exports.describe =
  'Returns a list of data element token names from a container.js file.';

exports.builder = (yargs) =>
  yargs
    .option('filePath', {
      describe: 'container.js file path',
      demandOption: true,
      type: 'string'
    })
    .option('unique', {
      describe: 'Return a deduplicated list of token names',
      type: 'boolean'
    })
    .option('onlyUndefined', {
      describe:
        'Returns only token names that do not have a data element definition inside ' +
        'the container.js file.',
      type: 'boolean'
    })
    .coerce('filePath', (arg) => require('fs').readFileSync(arg, 'utf8'))
    .example(
      '$0 --filePath <path>',
      'Returns all the data element token names found in the container.js file.'
    )
    .example(
      '$0 --filePath <path> --no-unique',
      'Returns non-deduplicated data element token names defined in the container.js file.'
    )
    .example(
      '$0 --filePath <path> --onlyUndefined',
      'Returns only the data element token names that are not defined in the container.js file.'
    )
    .default('onlyUndefined', false)
    .default('unique', true);

exports.handler = (argv) =>
  console.log(
    JSON.stringify(
      findTokens(argv.filePath, argv.unique, argv.onlyUndefined, true)
    )
  );
