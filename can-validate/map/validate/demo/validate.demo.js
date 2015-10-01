import can from 'can';
import 'can/view/stache/stache';
import 'can/map/define/define';

import template from './validate.demo.stache!';

var TestMap = can.Map.extend({
    define: {
        myVal: {
            value: 'hello',
            validate: {
                required: true,
                length: {
                    minimum: 6
                }
            }
        },
        myNum: {
            value: 'heyo',
            validate: {
                required: true,
                numericality: {
                    greaterThan: 5
                }
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
