export interface GaugeTimeSeries {
  add(value: number): void;
  set(value: number): void;
}
