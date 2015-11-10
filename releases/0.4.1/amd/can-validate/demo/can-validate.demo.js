/*can-validate/demo/can-validate.demo*/
define([
    'exports',
    'can',
    '../can-validate',
    '../shims/validatejs.shim',
    './can-validate.demo.stache'
], function (exports, _can, _canValidate, _canValidateShimsValidatejsShim, _canValidateDemoStache) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var template = _interopRequire(_canValidateDemoStache);
    var validations = {
            myVal: {
                required: true,
                length: { minimum: 6 }
            },
            myNum: {
                required: true,
                numericality: { greaterThan: 5 }
            }
        };
    can.$('#demo').append(template({
        myVal: 'testing testing',
        myNum: 100,
        errors: [],
        validateField: function (ctx, $el) {
            var $parent = $el.parents('.input-group'), $label = can.$('label[for=' + $parent.find('.form-control').attr('id') + ']'), val = $parent.data('field');
            var errors = can.validate.once(this.attr(val), validations[val]);
            if (errors) {
                $parent.addClass('has-error');
                $label.find('.text-danger').text(errors[0]);
            } else {
                $parent.removeClass('has-error');
                $label.find('.text-danger').text('');
            }
        }
    }));
});
//# sourceMappingURL=can-validate.demo.js.map