# OpenTelemetry Tracer SDK
[![Gitter chat][gitter-image]][gitter-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devDependencies][devDependencies-image]][devDependencies-url]
[![Apache License][license-image]][license-image]

`tracer-sdk` contains the foundation for all tracing SDKs of [opentelemetry-js](https://github.com/open-telemetry/opentelemetry-js).

Used standalone, this module provides methods for manual instrumentation of code, offering full control over span creation for client-side JavaScript (browser) and Node.js.

It does **not** provide automated instrumentation of known libraries, context propagation for asynchronous invocations or distributed-context out-of-the-box.

For automated instrumentation for Node.js, please see
[@opentelemetry/node-sdk](https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-node-sdk).

## Installation

```bash
npm install --save @opentelemetry/core
npm install --save @opentelemetry/tracer-sdk
```

## Usage

```js
const opentelemetry = require('@opentelemetry/core');
const { SDKTracer } = require('@opentelemetry/tracer-sdk');

// To start a trace, you first need to initialize the Tracer.
// NOTE: the default OpenTelemetry tracer does not record any tracing information.
const tracer = new SDKTracer();

// Initialize the OpenTelemetry APIs to use the SDKTracer bindings
opentelemetry.initGlobalTracer(tracer);

// To create a span in a trace, we used the global singleton tracer to start a new span.
const span = opentelemetry.getTracer().startSpan('foo');

// Create an Attributes
span.setAttribute('key', 'value');

// We must end the spans so they becomes available for exporting.
span.end();
```

## Example
See [examples/tracer-sdk-node](https://github.com/open-telemetry/opentelemetry-js/tree/master/examples/tracer-sdk-node) for an end-to-end example, including exporting created spans.

## Useful links
- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more about OpenTelemetry JavaScript: <https://github.com/open-telemetry/opentelemetry-js>
- For help or feedback on this project, join us on [gitter][gitter-url]

## License

Apache 2.0 - See [LICENSE][license-url] for more information.

[gitter-image]: https://badges.gitter.im/open-telemetry/opentelemetry-js.svg
[gitter-url]: https://gitter.im/open-telemetry/opentelemetry-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[license-url]: https://github.com/open-telemetry/opentelemetry-js/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-Apache_2.0-green.svg?style=flat
[dependencies-image]: https://david-dm.org/open-telemetry/opentelemetry-js/status.svg?path=packages/opentelemetry-tracer-sdk
[dependencies-url]: https://david-dm.org/open-telemetry/opentelemetry-js?path=packages%2Fopentelemetry-tracer-sdk
[devDependencies-image]: https://david-dm.org/open-telemetry/opentelemetry-js/dev-status.svg?path=packages/opentelemetry-tracer-sdk
[devDependencies-url]: https://david-dm.org/open-telemetry/opentelemetry-js?path=packages%2Fopentelemetry-tracer-sdk&type=dev