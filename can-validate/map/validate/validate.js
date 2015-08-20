/*can-validate/map/validate/validate*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
require('../../can-validate.js');
var proto = can.Map.prototype, oldSet = proto.__set, getPropDefineBehavior = function (behavior, attr, define) {
        var prop, defaultProp;
        if (define) {
            prop = define[attr];
            defaultProp = define['*'];
            if (prop && prop[behavior] !== undefined) {
                return prop[behavior];
            } else if (defaultProp && defaultProp[behavior] !== undefined) {
                return defaultProp[behavior];
            }
        }
    };
var ErrorsObj = can.Map.extend({}, {
        hasErrors: function () {
            return !can.isEmptyObject(this.attr());
        }
    });
var defaultValidationOpts = {
        mustValidate: false,
        validateOnInit: false
    };
can.extend(can.Map.prototype, {
    validate: function () {
        var errors = can.validate.validate(this);
        this.attr('errors', new ErrorsObj(errors));
        return can.isEmptyObject(errors);
    }
});
proto.__set = function (prop, value, current, success, error) {
    var allowSet = true, validateOpts = getPropDefineBehavior('validate', prop, this.define), processedValidateOptions = can.extend({}, defaultValidationOpts, validateOpts), defaultValue = getPropDefineBehavior('value', prop, this.define), propIniting = typeof current === 'undefined' && (defaultValue === value || typeof value === 'undefined'), errors;
    if (validateOpts && !propIniting || validateOpts && propIniting && processedValidateOptions.validateOnInit) {
        errors = can.validate.once(value, can.extend({}, processedValidateOptions), prop);
        if (errors && errors.length > 0) {
            if (!this.attr('errors')) {
                this.attr('errors', new ErrorsObj({}));
            }
            this.attr('errors').attr(prop, errors);
            if (processedValidateOptions.mustValidate === true) {
                allowSet = false;
            }
        } else {
            if (this.attr('errors') && this.attr('errors').attr(prop)) {
                this.attr('errors').removeAttr(prop);
            }
        }
    }
    if (allowSet) {
        oldSet.call(this, prop, value, current, success, error);
    }
};
//# sourceMappingURL=validate.js.map