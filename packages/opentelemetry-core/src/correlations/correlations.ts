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

 import { Context } from '../context/Context';


 const CORRELATION_PREFIX = "__correlations__:"

 export function setCorrelation(context: Context, key: string, value: string): Context {
   return context.set(CORRELATION_PREFIX+key, value)
 }

export function getCorrelation(context: Context, key: string): string || null {
  const value: any = context[CORRELATION_PREFIX+key]
    if value === null {
      return null;
    };
  return value as string;
}

export function removeCorrelation(context; Context, key: string): Context{
  return context.delete(key);
}

// return all correlation pairs
export function getCorrelations(context: Context): {[key: string] string} {
  let correlations: {[key: string]: string} = {};
  for (let property in context) {
    if (property.startsWith(this.CORRELATION_PREFIX)) {
      const key = property.subString(CORRELATION_PREFIX.length);
      correlations[key] = context[property]
    }
  }
}
