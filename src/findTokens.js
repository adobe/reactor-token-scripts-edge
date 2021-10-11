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

const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const difference = require('./arrayDifference');
const getTokenPattern = require('./getTokenPattern');

module.exports = (
  containerString,
  unique = true,
  onlyUndefined = false,
  onlyEnclosedInQuotes = false
) => {
  const r = RegExp(getTokenPattern(onlyEnclosedInQuotes), 'g');
  let tokens = [];
  let definedDataElements = [];

  const ast = parse(containerString);

  // The following code is used to find tokens.
  traverse(ast, {
    StringLiteral: (path) => {
      const stringValue = path.node.value;

      while ((res = r.exec(stringValue)) !== null) {
        tokens.push(res[1]);
      }
    },
    CallExpression: (path) => {
      if (path.node.callee.name === 'getDataElementValue') {
        const tokenNameNode = path.node.arguments[0];
        tokens.push(tokenNameNode.name || tokenNameNode.value);
      }
    }
  });

  // Here we search for the data elements keys that are defined in the container.
  // ATTENTION: This code transforms the ast, so generate a new ast if you need to
  // do something new.
  traverse(ast, {
    ObjectProperty: (path) => {
      const keyName = path.node.key.name || path.node.key.value;

      if (keyName === 'dataElements') {
        // Remove any function since they cannont be JSON.parsed.
        traverse(
          path.node.value,
          {
            // Replace identifiers with strings key names.
            Identifier: (path) => {
              path.replaceWith(t.stringLiteral(path.node.name));
            },
            // Remove the data element object so we can keep only the names.
            ObjectExpression: (path) => {
              path.replaceWith(t.stringLiteral(''));
            }
          },
          path.scope
        );

        const dataElementsObject = JSON.parse(generate(path.node.value).code);
        definedDataElements = Object.keys(dataElementsObject);
      }
    }
  });

  if (unique) {
    tokens = tokens.filter(
      (value, index, self) => self.indexOf(value) === index
    );
  }

  if (onlyUndefined) {
    tokens = difference(tokens, definedDataElements);
  }

  return tokens;
};
