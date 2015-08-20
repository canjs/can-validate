/*can-validate/can-validate*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var processMapDefine = function (targetMap) {
    var targetDefine = targetMap.define, resp = {
            values: {},
            opts: {}
        };
    can.each(targetDefine, function (item, prop) {
        resp.values[prop] = targetMap.attr(prop);
        resp.opts[prop] = item.validate;
    });
    return resp;
};
var Validate = can.validate = can.Construct.extend({
        _validatorId: '',
        _validators: {},
        validator: function () {
            return this._validators[this._validatorId];
        },
        register: function (id, validator) {
            this._validatorId = id;
            this._validators[id] = validator;
        },
        isValid: function () {
            return this.validator().isValid.apply(this, arguments);
        },
        once: function () {
            return this.validator().once.apply(this, arguments);
        },
        validate: function () {
            var validateArgs = arguments;
            if (arguments[0] instanceof can.Map && arguments[0].define) {
                var mapOptions = processMapDefine(arguments[0]);
                validateArgs = [];
                validateArgs.push(mapOptions.values);
                validateArgs.push(mapOptions.opts);
            }
            return this.validator().validate.apply(this, validateArgs);
        }
    }, {});
module.exports = can;
//# sourceMappingURL=can-validate.js.map