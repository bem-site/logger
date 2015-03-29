# Logger
Simple logger module for bem-site projects.
It is simple wrapper around node console methods.

[![Coveralls branch](https://img.shields.io/coveralls/bem-site/logger/master.svg)](https://coveralls.io/r/bem-site/logger?branch=master)
[![Travis](https://img.shields.io/travis/bem-site/logger.svg)](https://travis-ci.org/bem-site/logger)
[![David](https://img.shields.io/david/bem-site/logger.svg)](https://david-dm.org/bem-site/logger)
[![David](https://img.shields.io/david/dev/bem-site/logger.svg)](https://david-dm.org/bem-site/logger#info=devDependencies)

## Usage

Add logger dependency to your project:
```
npm install --save bem-site-logger
```

Add logger requirement to the code of your module:

```
var logger = require('bem-site-logger').createLogger(module);
logger.info('Hello World');
```

### Advanced configuration

Your can override some default logger options by:
```
var options = {
        level: 'debug',
        color: false,
        useDate: false
    },
    logger = require('bem-site-logger').setOptions(options).createLogger(module);
```.

Where available options are:

* `level` - logger verbosity level.
Can be one of 5 available values: `'verbose'`, `'debug'`, `'info'`, `'warn'`, `'error'`.
Default value is `'info'`.

* `color` - colorize logger messages. If this option is set to true then part of log message will
be colorized to color which depends of log message level.
Default value is `true`.

* `useDate` - adds date in human readable format to log message. If this option is set to true then
every log message begins with string (for example: [2015-03-28 04:25:56])
Default value is `true`.

### API

#### Class methods:

* `setOptions` - overrides default logger options.
Attention! It overrides options for all logger instances (for all modules which requires logger module).
* `resetOptions` - drops all options to their default values.
* `createLogger` - create logger for given module. You can pass your module which requires logger
and log message will contain last part of your module file path. It can be suitable for finding module
by log message. If module value is omitted then logger own module will be taken.

#### Instance methods:

Creates and outputs log messages for different verbosity levels:
Each method has the signature which is equal to methods of native Node console module.
For example you can use formatted output:

 ```
 logger.info('%s-%s', 'a', 1) //result (without prefix) will be: a-1
 ```

* `verbose` - creates log message with 'verbose' verbosity level.
Finally it calls itself `console.log()` method with generated message string.
* `debug`  - creates log message with 'debug' verbosity level.
Finally it calls itself `console.log()` method with generated message string.
* `info` - creates log message with 'info' verbosity level.
Finally it calls itself `console.info()` method with generated message string.
* `warn` - creates log message with 'warn' verbosity level.
Finally it calls itself `console.warn()` method with generated message string.
* `error` - creates log message with 'error' verbosity level.
Finally it calls itself `console.error()` method with generated message string.

## Testing

Run tests:
```
npm run mocha
```

Run tests with istanbul coverage calculation:
```
npm run istanbul
```

Run codestyle verification (jshint and jscs)
```
npm run codestyle
```

Maintainer @tormozz48
Please send your questions and proposals to: tormozz48@gmail.com
