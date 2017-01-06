/*can-validate@1.0.0-pre.1#can-validate*/
define(function (require, exports, module) {
    var Construct = require('can-construct');
    var validate = require('./lib/validate');
    var helpers = require('./lib/helpers');
    var Validate = Construct.extend({
        validations: {},
        library: {},
        registerLibrary: function (key, shim) {
            if (key && shim && shim.test) {
                this.library = {
                    name: key,
                    shim: shim
                };
                return true;
            } else {
                return false;
            }
        },
        registerValidator: function (key, validator) {
            this.validations[key] = validator;
        },
        errors: function () {
            return this._errors || [];
        },
        test: function (value, constraints) {
            this._errors = validate.validateValue.call(this, value, constraints);
            return this.errors().length === 0;
        }
    });
    module.exports = Validate;
});
//# sourceMappingURL=can-validate.js.map