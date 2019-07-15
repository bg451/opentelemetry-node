import { SpanContext } from '../trace/span_context';
import { DistributedContext } from '../distributed_context/DistributedContext';
import { Measure, MeasureOptions, Measurement } from './measure';
import { Metric, MetricOptions } from './metric';
import { CounterTimeSeries } from './counter';
import { GaugeTimeSeries } from './gauge';

export interface RecordOptions {
  spanContext?: SpanContext;
  distributedContext?: DistributedContext;
}

export interface Meter {
  createMeasure(name: string, options?: MeasureOptions): Measure;

  createCounter(name: string, options?: MetricOptions): Metric<CounterTimeSeries>;
  createGauage(name: string, options?: MetricOptions): Metric<GaugeTimeSeries>;

  record(measurements: Measurement[], options?: RecordOptions): void;
}

