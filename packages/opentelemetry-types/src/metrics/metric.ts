import { Attributes } from '../common/attributes';

export interface Meter {
  createMeasure(name: string, options?: MesureOptions): Measure;

  createDoubleMeasurement(name: string): Measure;
  CreateLongMeasurement(name: string): Measure>;

  record([]Measurement measurements);
}

export interface MetricOptions {
  // Description of the Metric.
  description?: string;

  // Unit of the Metric values.
  unit?: string;

  // List of keys for attributes with dynamic values. Order of list is important
  // as the same order must be used when supplying values for these attributes.
  dynamicAttributes?: []string

  // List of attributes with constant values.
  constantAttributes?: []Attributes;

  // Resource the metric is associated with.
  resource?: Resource;

  // Name of the component that reports the metric.
  component? string;
}

// metrics<Counter<Double>>
export interface Metric<T> {
  getOrCreateTimeSeries(values: []unknown): T;
  getDefaultTimeSeries(): T;

  removesTimeseries(values: []unknown): void;

  clear(): void;

  // todo: what should the callback signature be?
  setCallback(fn: () => void): void;
}

export interface Measure {
  createDoubleMeasurement(value: double): Measurement;
  createLongMeasurement(value: long): Measurement;
}


// Measurement describes an individual measurement
export interface Measurement{}
