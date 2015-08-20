/*can-validate/shims/validatejs.shim*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var validatejs = _interopRequire(require('validate.js'));
function processOptions(opts) {
    if (opts.required) {
        opts.presence = true;
        if (typeof opts.required === 'object') {
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
var Shim = can.Construct.extend({
        once: function (value, options, name) {
            var errors = validatejs.single(value, processOptions(options));
            if (errors && name) {
                for (var i = 0; i < errors.length; i++) {
                    errors[i] = can.capitalize(can.camelize(name)) + ' ' + errors[i];
                }
            }
            return errors;
        },
        isValid: function (value, options) {
            var errors = validatejs.single(value, processOptions(options)) || [];
            return errors.length === 0;
        },
        validate: function (values, options) {
            var valueKeys = Object.keys(values), processedOpts = {};
            for (var i = 0; i < valueKeys.length; i++) {
                var prop = valueKeys[i];
                if (options[prop]) {
                    processedOpts[prop] = processOptions(options[prop]);
                }
            }
            return validatejs(values, processedOpts);
        }
    });
can.validate.register('validatejs', new Shim());
//# sourceMappingURL=validatejs.shim.js.map