/*
Copyright 2021 Adobe. All rights reserved.
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

let result = false;

const isObjectNodeContainingVariable = (node, variableName) => {
  if (node.type === 'ObjectPattern') {
    return (
      node.properties.filter((n) => {
        if (n.type === 'ObjectProperty') {
          return (
            n.key.name === variableName ||
            isObjectNodeContainingVariable(n.value, variableName)
          );
        }

        return false;
      }).length > 0
    );
  }

  if (node.type === 'Identifier') {
    return node.name === variableName;
  }
};

const isNodeContainingVariable = (node, variableName) => {
  if (node.type === 'Identifier') {
    return node.name === variableName;
  }

  if (node.type === 'ObjectPattern') {
    return isObjectNodeContainingVariable(node, variableName);
  }

  if (node.type === 'MemberExpression') {
    if (node.property.name === variableName) {
      return true;
    }

    return isNodeContainingVariable(node.object, variableName);
  }

  return false;
};

const variableNodeLevel = (node, variableName, level = -1) => {
  if (node.type === 'ObjectPattern') {
    return Math.max(
      ...node.properties.map((n) => {
        if (n.type === 'ObjectProperty' && n.key.name === variableName) {
          return level + 1;
        }

        return variableNodeLevel(n.value, variableName, level + 1);
      })
    );
  }

  if (node.type === 'Identifier' && node.name === variableName) {
    return level + 1;
  }

  return -1;
};

const getVariableName = (node) => {
  if (node.type === 'Identifier') {
    return node.name;
  }

  return null;
};

const getValueForKey = (node, key) => {
  if (node.type === 'ObjectPattern') {
    return node.properties
      .map((n) => {
        if (n.type === 'ObjectProperty' && n.key.name === key) {
          if (n.value.type === 'ObjectPattern') {
            return n.value.properties.map((b) => b.value.name);
          }
          if (n.value.type === 'Identifier') {
            return n.value.name;
          }
        }

        return getValueForKey(n.value, key);
      })
      .flat();
  }

  return [];
};

const getBindingFor = (searchVariableName, variableName) => (binding) => {
  while (binding) {
    const { path } = binding;
    const { node } = path;

    if (node.type === 'VariableDeclarator') {
      const leftNode = node.id;
      const rightNode = node.init;

      if (isNodeContainingVariable(leftNode, searchVariableName)) {
        if (variableName) {
          const values = getValueForKey(leftNode, searchVariableName);
          if (!values.includes(variableName)) {
            return null;
          }
        }

        if (variableNodeLevel(leftNode, searchVariableName) === 0) {
          return path.scope.bindings[getVariableName(rightNode)];
        } else {
          return binding;
        }
      }

      if (isNodeContainingVariable(rightNode, searchVariableName)) {
        return binding;
      }

      binding = path.scope.bindings[getVariableName(rightNode)];
      if (variableName) {
        variableName = getVariableName(rightNode);
      }
    } else if (node.type === 'ObjectPattern') {
      if (isNodeContainingVariable(node, searchVariableName)) {
        if (variableName) {
          const values = getValueForKey(node, searchVariableName);
          if (!values.includes(variableName)) {
            return null;
          }
        }

        return binding;
      } else {
        return null;
      }
    } else {
      binding = null;
    }
  }

  return null;
};
const isModuleExportsParameter = (binding) => {
  let path;
  let node;

  ({ path } = binding);
  ({ node } = path);

  if (node.type === 'VariableDeclarator') {
    let n = node.init;
    while (n.object) {
      n = n.object;
    }

    binding = path.scope.bindings[n.name];
    ({ path } = binding);
    ({ node } = path);
  }

  return (
    ['Identifier', 'ObjectPattern'].includes(node.type) &&
    ['ArrowFunctionExpression', 'FunctionExpression'].includes(path.parent.type)
  );
};

const isAddToResponse = (path) => {
  const x = generate;
  const functionName = path.node.callee?.name;
  if (!functionName) {
    return;
  }

  const parts = [
    getBindingFor('addToResponse', functionName),
    getBindingFor('utils'),
    isModuleExportsParameter
  ];

  let currentBinding = path.scope.bindings[functionName];
  while (parts.length > 0) {
    const currentFn = parts.shift();
    currentBinding = currentFn(currentBinding);
    if (!currentBinding) {
      return false;
    }
  }

  return true;
};

const addToResponseVisitor = {
  CallExpression: (path) => {
    if (isAddToResponse(path)) {
      result = true;
    }
  }
};

module.exports = (moduleSource) => {
  result = false;
  const ast = parse(moduleSource);

  traverse(ast, {
    AssignmentExpression: (path) => {
      const { node } = path;
      if (
        node?.left?.type !== 'MemberExpression' ||
        node?.left?.object?.name !== 'module' ||
        node?.left?.property?.name !== 'exports'
      ) {
        path.stop();
        return;
      }

      path.stop();
      path.traverse(addToResponseVisitor);
    }
  });

  return result;
};
