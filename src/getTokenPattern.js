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

// This will be used in regex expressions.
// When onlyEnclosedInQuotes=false then the following cases will be detected:
// getDataElementValue(a) - without quotes
// getDataElementValue("a")
// getDataElementValue('a')
// getDataElementValue(\"a\")
// getDataElementValue(\'a\')
//
// When onlyEnclosedInQuotes=true then the following cases will be detected:
// getDataElementValue("a")
// getDataElementValue('a')
// This case will be used when findTokens CLI script is run after the CF script is built.

module.exports = (onlyEnclosedInQuotes = false) =>
  onlyEnclosedInQuotes
    ? 'getDataElementValue\\((?:"|\')(.*?)(?:"|\')\\)'
    : 'getDataElementValue\\((?:\\\\*(?:"|\'))?(.*?)(?:\\\\*(?:"|\'))?\\)';
