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

import * as types from '@opentelemetry/types';
import {
  randomTraceId,
  isValid,
  randomSpanId,
  NoRecordingSpan,
  ConsoleLogger,
} from '@opentelemetry/core';
import {
  BinaryFormat,
  HttpTextFormat,
  TraceFlags,
  Logger,
} from '@opentelemetry/types';
import { BasicTracerConfig, TraceParams } from './types';
import { Span } from './Span';
import { mergeConfig } from './utility';
import { SpanProcessor } from './SpanProcessor';
import { NoopSpanProcessor } from './NoopSpanProcessor';
import { MultiSpanProcessor } from './MultiSpanProcessor';
import { DEFAULT_CONFIG } from './config';

const ACTIVE_SPAN_PREFIX = "trace.active_span";

/**
 * This class represents a tracer that primarily uses Contexts for span
 * propagation. PoC.
 */
export class ContextTracer {
  private readonly _defaultAttributes: types.Attributes;
  private readonly _binaryFormat: types.BinaryFormat;
  private readonly _httpTextFormat: types.HttpTextFormat;
  private readonly _sampler: types.Sampler;
  private readonly _traceParams: TraceParams;
  readonly logger: Logger;
  private readonly _registeredSpanProcessor: SpanProcessor[] = [];
  activeSpanProcessor = new NoopSpanProcessor();

  /**
   * Constructs a new Tracer instance.
   */
  constructor(config: BasicTracerConfig = DEFAULT_CONFIG) {
    const localConfig = mergeConfig(config);
    this._defaultAttributes = localConfig.defaultAttributes;
    this._sampler = localConfig.sampler;
    this._traceParams = localConfig.traceParams;
    this.logger = config.logger || new ConsoleLogger(config.logLevel);
  }

  /**
   * Starts a new Span or returns the default NoopSpan based on the sampling
   * decision.
   */
  startSpan(context: Context, name: string, options: types.SpanOptions = {}): Context {
    const currentSpan = this.getCurrentSpan(context)
    const parentContext = this._getParentSpanContext(currentSpan);

    // make sampling decision
    const samplingDecision = this._sampler.shouldSample(parentContext);
    const spanId = randomSpanId();
    let traceId;
    let traceState;
    if (!parentContext || !isValid(parentContext)) {
      // New root span.
      traceId = randomTraceId();
    } else {
      // New child span.
      traceId = parentContext.traceId;
      traceState = parentContext.traceState;
    }
    const traceFlags = samplingDecision
      ? TraceFlags.SAMPLED
      : TraceFlags.UNSAMPLED;
    const spanContext = { traceId, spanId, traceFlags, traceState };
    const recordEvents = options.isRecordingEvents || false;
    if (!recordEvents && !samplingDecision) {
      this.logger.debug('Sampling is off, starting no recording span');
      return new NoRecordingSpan(spanContext);
    }

    const span = new Span(
      this,
      name,
      spanContext,
      options.kind || types.SpanKind.INTERNAL,
      parentContext ? parentContext.spanId : undefined,
      options.startTime
    );
    // Set default attributes
    span.setAttributes(
      Object.assign({}, this._defaultAttributes, options.attributes)
    );

    context = context.set(ACTIVE_SPAN_PREFIX, span);

    return context;
  }

  /**
   * Returns the current Span from the current context.
   *
   * If there is no Span associated with the current context, null is returned.
   */
  getCurrentSpan(context: Context): types.Span | null {
    // Get the current Span from the context or null if none found.
    const current = context.get(ACTIVE_SPAN_PREFIX);
    if (current === null || current === undefined) {
      return null;
    } else {
      return current as types.Span;
    }
  }

  /** Returns the active {@link TraceParams}. */
  getActiveTraceParams(): TraceParams {
    return this._traceParams;
  }

  /**
   * Adds a new {@link SpanProcessor} to this tracer.
   * @param spanProcessor the new SpanProcessor to be added.
   */
  addSpanProcessor(spanProcessor: SpanProcessor): void {
    this._registeredSpanProcessor.push(spanProcessor);
    this.activeSpanProcessor = new MultiSpanProcessor(
      this._registeredSpanProcessor
    );
  }

  private _getParentSpanContext(
    parent: types.Span | types.SpanContext | undefined
  ): types.SpanContext | undefined {
    if (!parent) return undefined;

    // parent is a SpanContext
    if ((parent as types.SpanContext).traceId) {
      return parent as types.SpanContext;
    }

    if (typeof (parent as types.Span).context === 'function') {
      return (parent as Span).context();
    }
    return undefined;
  }
}
