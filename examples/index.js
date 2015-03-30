var Logger = require('../index');

console.log('\n[base settings]');
(function () {
    var logger = Logger.createLogger(module);

    logger.verbose('Hello World (verbose)');
    logger.debug('Hello World (debug)');
    logger.info('Hello World (info)');
    logger.warn('Hello World (warn)');
    logger.error('Hello World (error)');
})();

require('./base/verbose');
require('./base/debug');
require('./base/info');
require('./base/warn');
require('./base/error');

require('./monochrome');
require('./without-date');
