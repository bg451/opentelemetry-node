/*!
 * Copyright 2019, OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as assert from 'assert';
import { NoopTracerFactory } from '../../src/trace/NoopTracerFactory';
import { NOOP_SPAN } from '../../src/trace/NoopSpan';

describe('NoopTracerFactory', () => {
  it('should return a NOOP_SPAN', () => {
    const factory = new NoopTracerFactory();
    const span = factory.getTracer('fake').startSpan('my-span');
    assert.deepStrictEqual(span, NOOP_SPAN);
  });
});
