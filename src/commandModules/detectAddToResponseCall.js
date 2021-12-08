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
const detectAddToResponseCall = require('../detectAddToResponseCall');

exports.command = 'detectAddToResponseCall';

exports.describe =
  'Checks if the  `addToResponse` method is present and called in the provided JS code.';

exports.builder = (yargs) =>
  yargs
    .option('filePath', {
      describe: 'JS file path',
      demandOption: true,
      nargs: 1,
      type: 'string'
    })
    .example(
      '$0 --filePath <path>',
      'Returns true if `addToResponse` method is present in the JS code from file. False otherwise'
    )
    .example(
      'cat <path> | $0 --filePath -',
      'Returns true if `addToResponse` method is present in the JS code from stdin. False otherwise'
    );

exports.handler = (argv) => {
  let content;
  if (argv.filePath === '-') {
    content = fs.readFileSync(0, 'utf8');
  } else {
    content = fs.readFileSync(argv.filePath, 'utf8');
  }

  const result = detectAddToResponseCall(content);

  if (result) {
    console.log(true);
  } else {
    console.log(false);
  }
};
