/**
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

import { Attributes } from '../trace/attributes';
import { Resource } from '../resources/Resource';
export interface Meter {
  createMeasure(name: string, options?: MesureOptions): Measure;

  createDoubleMeasurement(name: string): Measure;
  CreateLongMeasurement(name: string): Measure>;

  record([]Measurement measurements);
}

export interface MetricOptions {
  // Name of the component that reports the metric.
  component?: string;

  // Resource the metric is associated with.
  resource?: Resource;

  // Description of the Metric.
  description?: string;

  // Unit of the Metric values.
  unit?: string;

  // List of attributes with constant values.
  constantAttributes?: Attributes;

  // List of attribute keys with dynamic values. Order of list is important
  // as the same order must be used when supplying values for these attributes.
  dynamicAttributes?: string[];

  // Bidirectional allows cumulative metrics to accept negative values. Otherwise,
  // as false, the metric is unidirectional and rejects negative values.
  bidirectional?: boolean;

  // Unitdirection indicates a gauge metric only ascends, indicating it is for
  // rate calculations.
  unidirectional?: boolean;

  // indicates a measure is never negative, indicating it is for rate calculations.
  nonNegative?: boolean;
}

// Metric represents a base class for different types of metric preaggregations.
export interface Metric<T> {
  // Creates a handle if the specified attribute values
  // are not associated with an existing handle, otherwise returns the
  // existing handle.
  // Order and number of attribute values MUST match the order and number of
  // dynanic attribute keys when the Metric was created.
  getOrCreateHandle(values: unknown[]): T;

  // Returns a handle with all attribute values not set.
  getDefaultHandle(): T;

  // Removes an existing handle. Order and number of attribute values MUST
  // match the order and number of dynamic attribute keys when the Metric was
  // created.
  removesHandle(values: unknown[]): void;

  // Clears all handle from the Metric.
  clear(): void;

  // todo: what should the callback signature be?
  setCallback(fn: () => void): void;
}
