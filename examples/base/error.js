var Logger = require('../../index');

console.log('\n[base settings] [ERROR]');
(function () {
    var logger = Logger.setOptions({ level: 'error' }).createLogger(module);

    logger.verbose('Hello World (verbose)');
    logger.debug('Hello World (debug)');
    logger.info('Hello World (info)');
    logger.warn('Hello World (warn)');
    logger.error('Hello World (error)');
})();
