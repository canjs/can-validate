/*can-validate/map/validate/demo/validate.demo*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
require('can/view/stache/stache');
require('can/map/define/define');
var template = _interopRequire(require('./validate.demo.stache.js'));
var TestMap = can.Map.extend({
        define: {
            myVal: {
                value: 'hello',
                validate: {
                    required: true,
                    length: { minimum: 6 }
                }
            },
            myNum: {
                value: 'heyo',
                validate: {
                    required: true,
                    numericality: { greaterThan: 5 }
                }
            }
        }
    });
can.$('#demo').append(template({
    myMap: new TestMap({}),
    doValidate: function () {
        this.attr('myMap').validate();
    }
}));
//# sourceMappingURL=validate.demo.js.map