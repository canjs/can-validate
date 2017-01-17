/*can-validate@1.0.0-pre.2#lib/validate*/
define(function (require, exports, module) {
    var helpers = require('./helpers');
    var isEmptyObject = require('can-util/js/is-empty-object');
    var each = require('can-util/js/each');
    exports.errorDef = errorDef = {
        error: '',
        related: new Array()
    };
    exports.validateDef = { validate: null };
    var runValidations = function (value, constraints) {
        var errors = [];
        var scope = this;
        each(constraints, function (constraint, key) {
            var err = helpers.clone(errorDef);
            if (scope.validations[key]) {
                var rawError = scope.validations[key](value, constraint);
                if (rawError) {
                    if (typeof rawError === 'string') {
                        err.error = rawError;
                    }
                    if (typeof rawError === 'object') {
                        err.error = rawError.error;
                        err.related = rawError.related;
                    }
                    errors.push(err);
                }
            }
        });
        return errors;
    };
    exports.validateValue = function (value, constraints) {
        var errors = [];
        var library = this.library;
        if (isEmptyObject(library)) {
            errors = runValidations.call(this, value, constraints);
        } else {
            errors = library.shim.test(value, constraints);
        }
        return errors;
    };
});
//# sourceMappingURL=validate.js.map