/*can-validate/can-validate*/
define([
    'exports',
    'module',
    'can'
], function (exports, module, _can) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    var processMapDefine = function processMapDefine(targetMap) {
        var targetDefine = targetMap.define;
        var resp = {
                values: {},
                opts: {}
            };
        _can2['default'].each(targetDefine, function (item, prop) {
            resp.values[prop] = targetMap.attr(prop);
            resp.opts[prop] = item.validate;
        });
        return resp;
    };
    var Validate = _can2['default'].Construct.extend({
            _validatorId: '',
            _validators: {},
            validator: function validator() {
                return this._validators[this._validatorId];
            },
            register: function register(id, validator) {
                this._validatorId = id;
                this._validators[id] = validator;
            },
            isValid: function isValid() {
                return this.validator().isValid.apply(this, arguments);
            },
            once: function once() {
                return this.validator().once.apply(this, arguments);
            },
            validate: function validate() {
                var validateArgs = arguments;
                if (arguments[0] instanceof _can2['default'].Map && arguments[0].define) {
                    var mapOptions = processMapDefine(arguments[0]);
                    validateArgs = [];
                    validateArgs.push(mapOptions.values);
                    validateArgs.push(mapOptions.opts);
                }
                return this.validator().validate.apply(this, validateArgs);
            }
        }, {});
    _can2['default'].validate = Validate;
    module.exports = _can2['default'];
});
//# sourceMappingURL=can-validate.js.map