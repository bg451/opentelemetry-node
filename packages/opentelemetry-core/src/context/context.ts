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

// Context is an immutable object that stores concerns in process.
export class Context {
  private _context: { [key: string]: unknown } = Object.create(null);

  // set returns a new context with the given key.
  set(key: string, value: unknown): Context {
    const context = Object.assign({}, this);
    context._context[key] = value;
    return context
  }

  get(key: string): unknown {
    return this._context[key]
  }

  delete(key: string) {
    const context= Object.assign({}, this);
    delete context._context[key]
    return context
  }
}

