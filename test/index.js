var should = require('should'),
    Logger = require('../index');

describe('logger', function () {
    describe('setOptions', function () {
        beforeEach(function () {
            Logger.resetOptions();
        });

        it('undefined options', function () {
            Logger.setOptions(null).should.be.ok;
        });

        it('empty options', function () {
            Logger.setOptions({}).should.be.ok;

            Logger.options.mode.should.equal('development');
            Logger.options.level.should.equal('info');
            Logger.options.color.should.equal(true);
            Logger.options.useDate.should.equal(true);
        });

        it('should override mode', function () {
            var o = {
                mode: 'testing'
            };
            Logger.setOptions(o).should.be.ok;

            Logger.options.mode.should.equal('testing');
            Logger.options.level.should.equal('info');
            Logger.options.color.should.equal(true);
            Logger.options.useDate.should.equal(true);
        });

        it('should override level', function () {
            var o = {
                level: 'debug'
            };
            Logger.setOptions(o).should.be.ok;

            Logger.options.mode.should.equal('development');
            Logger.options.level.should.equal('debug');
            Logger.options.color.should.equal(true);
            Logger.options.useDate.should.equal(true);
        });

        it('should override color', function () {
            var o = {
                color: false
            };
            Logger.setOptions(o).should.be.ok;

            Logger.options.mode.should.equal('development');
            Logger.options.level.should.equal('info');
            Logger.options.color.should.equal(false);
            Logger.options.useDate.should.equal(true);
        });

        it('should override useDate', function () {
            var o = {
                useDate: false
            };
            Logger.setOptions(o).should.be.ok;

            Logger.options.mode.should.equal('development');
            Logger.options.level.should.equal('info');
            Logger.options.color.should.equal(true);
            Logger.options.useDate.should.equal(false);
        });

        after(function () {
            Logger.resetOptions();
        });
    });

    describe('createLogger', function () {
        before(function () {
            Logger.setOptions({
                color: false,
                useDate: false
            });
        });

        it('should create logger for given module', function () {
            var l = Logger.createLogger(module);
            l.should.be.ok;
            l._prefixString('info').should.equal('INFO test/index.js: ');
        });

        it('should create logger without given module', function () {
            var l = Logger.createLogger(null);
            l.should.be.ok;
            l._prefixString('info').should.equal('INFO logger/index.js: ');
        });

        after(function () {
            Logger.resetOptions();
            Logger._clearLoggers();
        });
    });

    describe('instance methods', function () {
        var l;

        before(function () {
            Logger.setOptions({
                level: 'verbose'
            });
            l = Logger.createLogger(module);
        });

        it('should verbose', function () {
            l.verbose('test message');
        });

        it('should debug', function () {
            l.debug('test message');
        });

        it('should info', function () {
            l.info('test message');
        });

        it('should warn', function () {
            l.warn('test message');
        });

        it('should error', function () {
            l.error('test message');
        });

        after(function () {
            Logger.resetOptions();
            Logger._clearLoggers();
        });
    });

    describe('testing mode', function () {
        var l;
        before(function () {
            Logger.setOptions({
                mode: 'testing'
            });
            Logger._clearLoggers();
            l = Logger.createLogger(module);
        });

        it('should log only warn and error messages', function () {
            should.notDeepEqual(l._logger.verbose, console.log);
            should.notDeepEqual(l._logger.debug, console.log);
            should.notDeepEqual(l._logger.info, console.log);

            should.deepEqual(l._logger.warn, console.warn);
            should.deepEqual(l._logger.error, console.error);
        });

        describe('should return false', function () {
            it('for verbose', function () {
                l.verbose('test message').should.equal(false);
            });

            it('for debug', function () {
                l.debug('test message').should.equal(false);
            });

            it('for info', function () {
                l.info('test message').should.equal(false);
            });
        });

        after(function () {
            Logger.resetOptions();
        });
    });
});
