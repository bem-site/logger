var Logger = require('../../index');

console.log('\n[base settings] [VERBOSE]');
(function () {
    var logger = Logger.setOptions({ level: 'verbose' }).createLogger(module);

    logger.verbose('Hello World (verbose)');
    logger.debug('Hello World (debug)');
    logger.info('Hello World (info)');
    logger.warn('Hello World (warn)');
    logger.error('Hello World (error)');
})();
