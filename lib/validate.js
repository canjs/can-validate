var helpers = require('can-validate/lib/helpers');
var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
var each = require('can-util/js/each/each');

exports.errorDef = errorDef = {
  error: '',
  related: new Array() // can also be a string... but probably should always be an array
};

exports.validateDef = {
  validate: null // Should be a function that returns ErrorDef instance, string, or undefined
};

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
