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

import { Context } from "../context/Context";

// Injects the contents of a specific concern into the headers.
export interface HTTPInjector {
  inject(context: Context, headers: unknown): unknown;
}

// extracts a specific concern from the headers into the context.
export interface HTTPExtractor {
  extract(context: Context, headers: unknown): Context;
}


let globalInjectors: HTTPInjector[] = [];
let globalExtractors: HTTPExtractor[] = [];

// addInjectors adds an injector the global list.
export function addInjector(injector: HTTPInjector): void {
  globalInjectors.push(injector);
}

// addExtractors adds an extractor the global list.
export function addExtractor(extractor: HTTPExtractor): void {
  globalExtractors.push(extractor);
}

export function getGlobalExtractors(): HTTPExtractor[] {
  return globalExtractors
}

export function getGlobalInjectors(): HTTPInjector[] {
  return globalInjectors;
}

export function inject(context: Context, injectors: HTTPInjector[], headers: unknown): unknown {
  for (const injector of injectors) {
    headers = injector.inject(context, headers);
  }
  return headers;
}

export function extract(context: Context, extractors: HTTPExtractor[], headers: unknown): Context {
  for (const extractor of extractors) {
    context = extractor.extract(context, headers);
  }
  return context;
}
