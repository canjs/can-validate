/*can-validate/map/validate/validate*/
define([
    'exports',
    'can',
    '../../can-validate'
], function (exports, _can, _canValidateCanValidate) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    var proto = _can2['default'].Map.prototype;
    var oldSet = proto.__set;
    var ErrorsObj;
    var defaultValidationOpts;
    var processValidateOpts;
    var getPropDefineBehavior = function getPropDefineBehavior(behavior, attr, define) {
        var prop;
        var defaultProp;
        if (define) {
            prop = define[attr];
            defaultProp = define['*'];
            if (prop && prop[behavior] !== undefined) {
                return prop[behavior];
            } else {
                if (defaultProp && defaultProp[behavior] !== undefined) {
                    return defaultProp[behavior];
                }
            }
        }
    };
    ErrorsObj = _can2['default'].Map.extend({}, {
        hasErrors: function hasErrors() {
            return !_can2['default'].isEmptyObject(this.attr());
        }
    });
    defaultValidationOpts = {
        mustValidate: false,
        validateOnInit: false
    };
    processValidateOpts = function (itemObj, opts) {
        var processedObj = {};
        var computes = [];
        var vm = this;
        _can2['default'].each(opts, function (item, key) {
            var actualOpts = item;
            if (typeof item === 'function') {
                var compute = _can2['default'].compute(_can2['default'].proxy(item, vm));
                actualOpts = compute(itemObj.value);
                computes.push({
                    key: key,
                    compute: compute
                });
            }
            processedObj[key] = actualOpts;
        });
        _can2['default'].each(computes, function (item) {
            item.compute.bind('change', function (ev, newVal) {
                processedObj[item.key] = newVal;
                vm._validateOne(itemObj, processedObj);
            });
        });
        return processedObj;
    };
    _can2['default'].extend(_can2['default'].Map.prototype, {
        validate: function validate() {
            var errors = _can2['default'].validate.validate(this);
            this.attr('errors', new ErrorsObj(errors));
            return _can2['default'].isEmptyObject(errors);
        },
        _validateOne: function _validateOne(item, opts) {
            var errors;
            var allowSet = true;
            errors = _can2['default'].validate.once(item.value, _can2['default'].extend({}, opts), item.key);
            if (errors && errors.length > 0) {
                if (!this.attr('errors')) {
                    this.attr('errors', new ErrorsObj({}));
                }
                this.attr('errors').attr(item.key, errors);
                if (opts.mustValidate === true) {
                    allowSet = false;
                }
            } else {
                if (this.attr('errors') && this.attr('errors').attr(item.key)) {
                    this.attr('errors').removeAttr(item.key);
                }
            }
            return allowSet;
        }
    });
    proto.__set = function (prop, value, current, success, error) {
        var allowSet = true;
        var validateOpts = getPropDefineBehavior('validate', prop, this.define);
        var propIniting = this._init && this._init === 1 || false;
        var processedValidateOptions;
        processedValidateOptions = _can2['default'].extend({}, defaultValidationOpts, processValidateOpts.call(this, {
            key: prop,
            value: value
        }, validateOpts));
        if (validateOpts && !propIniting || validateOpts && propIniting && processedValidateOptions.validateOnInit) {
            allowSet = this._validateOne({
                key: prop,
                value: value
            }, processedValidateOptions);
        }
        if (allowSet) {
            oldSet.call(this, prop, value, current, success, error);
        }
    };
});
//# sourceMappingURL=validate.js.map