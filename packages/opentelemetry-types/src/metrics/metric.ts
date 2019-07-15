import { Attributes } from '../trace/attributes';
import { Resource } from '../resources/Resource';

export interface MetricOptions {
  // Description of the Metric.
  description?: string;

  // Unit of the Metric values.
  unit?: string;

  // List of keys for attributes with dynamic values. Order of list is important
  // as the same order must be used when supplying values for these attributes.
  dynamicAttributes?: string[];

  // List of attributes with constant values.
  constantAttributes?: Attributes[];

  // Resource the metric is associated with.
  resource?: Resource;

  // Name of the component that reports the metric.
  component?: string;
}

export interface Metric<T> {
  // getOrCreateTimeSeries creates a timeseries if the specified attribute values
  // are not associated with an existing timeseries, otherwise returns the
  // existing timeseries.
  // Order and number of attribute values MUST match the order and number of
  // dynanic attribute keys when the Metric was created.
  getOrCreateTimeSeries(values: unknown[]): T;

  // Returns a timeseries with all attribute values not set.
  getDefaultTimeSeries(): T;

  removesTimeseries(values: unknown[]): void;

  clear(): void;

  // todo: what should the callback signature be?
  setCallback(fn: () => void): void;
}
