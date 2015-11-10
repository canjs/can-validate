/*can-validate/demo/can-validate.demo*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
require('../can-validate.js');
require('../shims/validatejs.shim.js');
var template = _interopRequire(require('./can-validate.demo.stache.js'));
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
//# sourceMappingURL=can-validate.demo.js.map