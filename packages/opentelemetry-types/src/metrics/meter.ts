import { SpanContext } from '../trace/span_context';
import { DistributedContext } from '../distributed_context/distributed_context';
import { Measure, MeasureOptions, Measurement }from './measure';

export interface RecordOptions {
  spanContext?: SpanContext;
  distributedContext?: DistributedContext;
}

export interface Meter {
  createMeasure(name: string, options?: MesureOptions): Measure;

  createCounterDouble(name: string, options?: MetricOptions) Metric<CounterDoubleTimeSeries>;
  createCounterLong(name: string, options?: MetricOptions) Metric<CounterLongTimeSeries>;
  createGauageDouble(name: string, options? MetricOptions) Metric<GaugeDoubleTimeSeries>;
  createGauageLong(name: string, options? MetricOptions) Metric<GaugeLongTimeSeries>;

  record(measurements: []Measurement, options?: RecordOptions);
}

