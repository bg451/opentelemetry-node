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

// TODO: Measurements can have a long or double type. However, it looks like
// the metric timeseries API accepts values instead of Measurements, meaning
// that if you accept a number, the type gets lost. Both java and csharp have
// gone down the route of having two gauge interfaces, GaugeDoubleTimeseries and
// GaugeLongTimeseries, with param for that type. It'd be cool to only have a single
// interface, but maybe having two is necessary? Probs a good gh issue, the same
// goes for Measure types.
export interface GaugeTimeseries {
  // Adds the given value to the current value. Values can be negative.
  add(value: number): void;
  // Sets the given value. Values can be negative.
  set(value: number): void;
}
