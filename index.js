var util = require('util'),
    chalk = require('chalk'),
    moment = require('moment'),
    inherit = require('inherit'),

    loggers = {},
    Logger;

module.exports = Logger = inherit({
        _STYLES: {
            verbose: ['magenta'],
            debug: ['cyan'],
            info: ['green'],
            warn: ['bold', 'yellow'],
            error: ['bold', 'red']
        },

        _logger: undefined,
        _prefixString: undefined,
        _styleString: undefined,
        _stub: function () {
            return false;
        },

        /**
         * Logger initialization function
         * @param {Module} moduleForLog that uses this logger instance
         * @private
         */
        __constructor: function (moduleForLog) {
            if (this.__self.options.mode === 'testing') {
                this._logger = {
                    verbose: this._stub,
                    debug: this._stub,
                    info: this._stub,
                    warn: this._stub,
                    error: this._stub
                };
            } else {
                var _this = this;
                this._logger = ['verbose', 'debug', 'info', 'warn', 'error'].reduce(function (prev, item, index, arr) {
                    prev[item] = arr.slice(0, index + 1).indexOf(_this.__self.options.level) > -1 ?
                        (console[item] || console.log) : _this._stub;
                    return prev;
                }, {});
            }

            this._styleString = function (s, styles) {
                if (!this.__self.options.color) {
                    return s;
                }
                var f = styles.reduce(function (prev, item) {
                    prev = prev[item];
                    return prev;
                }, chalk);
                return f(s);
            };

            this._prefixString = function (level) {
                var prefix = '';
                if (this.__self.options.useDate) {
                    prefix = util.format('[%s] ', moment().format('YYYY-MM-DD HH:mm:ss'));
                }
                prefix += util.format('%s ', level.toUpperCase());
                prefix = this._styleString(prefix, this._STYLES[level]);
                prefix += moduleForLog['filename'].split('/').slice(-2).join('/') + ': ';
                return prefix;
            };
        },

        /**
         * Logs given message args with given log level
         * @param {String} level - log level
         * @param {Argument} args - logger arguments
         * @returns {Logger}
         * @private
         */
        _log: function (level, args) {
            this._logger[level](this._prefixString(level) + util.format.apply(this, args));
            return this;
        },

        /**
         * Alias for logging verbose messages
         * @returns {exports}
         */
        verbose: function () {
            return this._log('verbose', arguments);
        },

        /**
         * Alias for logging debug messages
         * @returns {exports}
         */
        debug: function () {
            return this._log('debug', arguments);
        },

        /**
         * Alias for logging info messages
         * @returns {exports}
         */
        info: function () {
            return this._log('info', arguments);
        },

        /**
         * Alias for logging warn messages
         * @returns {exports}
         */
        warn: function () {
            return this._log('warn', arguments);
        },

        /**
         * Alias for logging error messages
         * @returns {exports}
         */
        error: function () {
            return this._log('error', arguments);
        }
    }, {
        options: null,

        /**
         * Clears loggers hash. Needs for tests
         * @private
         */
        _clearLoggers: function () {
            loggers = {};
        },

        /**
         * Sets custom options for logger
         * @param {Object} options for logger
         * @returns {Logger}
         */
        setOptions: function (options) {
            options = options || {},
            this.options = this.options || {};
            this.options.mode = options.mode || process.env['NODE_ENV'] || 'development';
            this.options.level = options.level || 'info';
            this.options.color = options.color !== false;
            this.options.useDate = options.useDate !== false;
            return this;
        },

        /**
         * Drops all logger setting to default values
         * @returns {Logger}
         */
        resetOptions: function () {
            return this.setOptions(null);
        },

        /**
         * Creates logger for given module
         * @param {Module} m - module for log. If it is omitted then logger own module will be used
         * @returns {*}
         */
        createLogger: function (m) {
            if (!this.options) {
                this.resetOptions();
            }

            m = m || module;
            var fName = m['filename'];
            loggers[fName] = loggers[fName] || new Logger(m);
            return loggers[fName];
        }
    });

