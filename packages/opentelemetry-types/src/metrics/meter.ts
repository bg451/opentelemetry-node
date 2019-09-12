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

import { SpanContext } from '../trace/span_context';
import { DistributedContext } from '../distributed_context/DistributedContext';
import { MeasureTimeseries } from './measure';
import { Metric, MetricOptions } from './metric';
import { CumulativeTimeseries } from './cumulative';
import { GaugeTimeseries } from './gauge';

export interface RecordOptions {
  // spanContext represents a measurement exemplar in the form of a SpanContext.
  spanContext?: SpanContext;
  // distributedContext overrides the current context and adds dimensions
  // to the measurements.
  distributedContext?: DistributedContext;
}

export interface Meter {
  // Creates a new measure metric.
  createMeasure(name: string, options?: MetricOptions): Metric<MeasureTimeseries>;

  // Creates a new cumulative metric.
  createCumulative(name: string, options?: MetricOptions): Metric<CumulativeTimeseries>;

  // Creates a new gauge metric.
  createGauge(name: string, options?: MetricOptions): Metric<GaugeTimeseries>;
}