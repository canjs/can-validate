var Construct = require('can-construct');
var validate = require('can-validate/lib/validate');
var helpers = require('can-validate/lib/helpers');

var Validate = Construct.extend({
    validations: {},
    library: {},
    registerLibrary: function (key, shim) {
        // TODO This check may need improving
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
        // TODO: Is there a better way to register these?
        // Will overwrite previous validators, is that cool?
        this.validations[key] = validator;
    },
    // TODO This should be a compute
    errors: function () {
        return this._errors || [];
    },
    test: function (value, constraints) {
        this._errors = validate.validateValue.call(this, value, constraints);
        return this.errors().length === 0;
    }
});

module.exports = Validate;
