import can from 'can';
import 'can/map/define/';
import 'can-validate/map/validate/';
import 'can-validate/shims/validatejs.shim';
import template from './demo.stache!';

var TestMap = can.Map.extend({
    define: {
        myNum: {
            value: 'heyo',
            validate: {
                required: true,
                numericality: {
                    greaterThan: 5,
                    message: '^This is a custom message! Hi!'
                }
            }
        },
        isRequired: {
            value: false,
            type: 'boolean'
        },
        myVal: {
            type: 'string',
            validate: {
                required: function () {
                    return this.attr('isRequired') || false;
                },
                validateOnInit: true
            }
        }
    },
    doValidate: function () {
        this.validate();
    }
});

can.$('#demo').html(template({
    myMap: new TestMap({isRequired: true}),
    myFailMap: new TestMap({testString: 'hello'})
}));
