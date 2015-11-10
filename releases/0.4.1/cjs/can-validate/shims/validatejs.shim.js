/*can-validate/shims/validatejs.shim*/
'use strict';
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _can = require('can');
var _can2 = _interopRequireDefault(_can);
var _validateJs = require('validate.js');
var _validateJs2 = _interopRequireDefault(_validateJs);
function processOptions(opts) {
    if (typeof opts.required !== 'undefined') {
        if (typeof opts.required === 'object' || typeof opts.required === 'boolean') {
            opts.presence = opts.required;
        }
        delete opts.required;
    }
    if (opts.hasOwnProperty('mustValidate')) {
        delete opts.mustValidate;
    }
    if (opts.hasOwnProperty('validateOnInit')) {
        delete opts.validateOnInit;
    }
    return opts;
}
;
var Shim = _can2['default'].Construct.extend({
        once: function once(value, options, name) {
            var errors = _validateJs2['default'].single(value, processOptions(options));
            if (errors && name) {
                for (var i = 0; i < errors.length; i++) {
                    errors[i] = _can2['default'].capitalize(_can2['default'].camelize(name)) + ' ' + errors[i];
                }
            }
            return errors;
        },
        isValid: function isValid(value, options) {
            var errors = _validateJs2['default'].single(value, processOptions(options)) || [];
            return errors.length === 0;
        },
        validate: function validate(values, options) {
            var valueKeys = Object.keys(values), processedOpts = {};
            for (var i = 0; i < valueKeys.length; i++) {
                var prop = valueKeys[i];
                if (options[prop]) {
                    processedOpts[prop] = processOptions(options[prop]);
                }
            }
            return (0, _validateJs2['default'])(values, processedOpts);
        }
    });
_can2['default'].validate.register('validatejs', new Shim());
//# sourceMappingURL=validatejs.shim.js.map