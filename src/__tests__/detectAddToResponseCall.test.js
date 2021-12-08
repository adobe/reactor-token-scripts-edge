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

const fs = require('fs');
const path = require('path');
const detectAddToResponseCall = require('../detectAddToResponseCall');

describe('detect add to responser call', () => {
  test('should return true for case1', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall1.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case2', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall2.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case3', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall3.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case4', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall4.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case5', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall5.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case6', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall6.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case7', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall7.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case8', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall8.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case9', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall9.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test('should return true for case10', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall10.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });

  test.only('should return true for case11', () => {
    const fixture = fs.readFileSync(
      path.join(
        __dirname,
        '../../test/fixtures/detectAddToResponseCall/addToResponseCall11.js'
      ),
      'utf8'
    );
    expect(detectAddToResponseCall(fixture)).toBe(true);
  });
});
