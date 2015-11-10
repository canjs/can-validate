/*can-validate@0.0.5#demo/can-validate.demo.stache!can-validate@0.0.5#stache.js*/
define(['can/view/stache'], function (stache) {
    return can.view.preloadStringRenderer('can-validate@0_0_5#demo_can-validate_demo_stache', stache([
        {
            'tokenType': 'start',
            'args': [
                'h1',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'h1',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['can.validate Demo']
        },
        {
            'tokenType': 'close',
            'args': ['h1']
        },
        {
            'tokenType': 'chars',
            'args': ['\n\n']
        },
        {
            'tokenType': 'start',
            'args': [
                'p',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'p',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['The value ']
        },
        {
            'tokenType': 'start',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['myVal']
        },
        {
            'tokenType': 'close',
            'args': ['code']
        },
        {
            'tokenType': 'chars',
            'args': [' should be at least 6 characters long.\nThe value ']
        },
        {
            'tokenType': 'start',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['myNum']
        },
        {
            'tokenType': 'close',
            'args': ['code']
        },
        {
            'tokenType': 'chars',
            'args': [' should just be a number greater than 5.']
        },
        {
            'tokenType': 'close',
            'args': ['p']
        },
        {
            'tokenType': 'chars',
            'args': ['\n\n']
        },
        {
            'tokenType': 'start',
            'args': [
                'p',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'p',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['Current value of ']
        },
        {
            'tokenType': 'start',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['myVal']
        },
        {
            'tokenType': 'close',
            'args': ['code']
        },
        {
            'tokenType': 'chars',
            'args': [': ']
        },
        {
            'tokenType': 'start',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['[']
        },
        {
            'tokenType': 'special',
            'args': ['myVal']
        },
        {
            'tokenType': 'chars',
            'args': [']']
        },
        {
            'tokenType': 'close',
            'args': ['code']
        },
        {
            'tokenType': 'start',
            'args': [
                'br',
                true
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'br',
                true
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\nCurrent value of ']
        },
        {
            'tokenType': 'start',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['myNum']
        },
        {
            'tokenType': 'close',
            'args': ['code']
        },
        {
            'tokenType': 'chars',
            'args': [': ']
        },
        {
            'tokenType': 'start',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'code',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['[']
        },
        {
            'tokenType': 'special',
            'args': ['myNum']
        },
        {
            'tokenType': 'chars',
            'args': [']']
        },
        {
            'tokenType': 'close',
            'args': ['code']
        },
        {
            'tokenType': 'close',
            'args': ['p']
        },
        {
            'tokenType': 'chars',
            'args': ['\n\n']
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['panel panel-default']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n  ']
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['panel-heading']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n    ']
        },
        {
            'tokenType': 'start',
            'args': [
                'h3',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['panel-title']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'h3',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['Validation Test']
        },
        {
            'tokenType': 'close',
            'args': ['h3']
        },
        {
            'tokenType': 'chars',
            'args': ['\n  ']
        },
        {
            'tokenType': 'close',
            'args': ['div']
        },
        {
            'tokenType': 'chars',
            'args': ['\n  ']
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['panel-body']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n    ']
        },
        {
            'tokenType': 'start',
            'args': [
                'form',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'form',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n      ']
        },
        {
            'tokenType': 'start',
            'args': [
                'label',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['for']
        },
        {
            'tokenType': 'attrValue',
            'args': ['test1']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['for']
        },
        {
            'tokenType': 'end',
            'args': [
                'label',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['MyVal ']
        },
        {
            'tokenType': 'start',
            'args': [
                'span',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['text-danger']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'span',
                false
            ]
        },
        {
            'tokenType': 'close',
            'args': ['span']
        },
        {
            'tokenType': 'close',
            'args': ['label']
        },
        {
            'tokenType': 'chars',
            'args': ['\n      ']
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['input-group']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'special',
            'args': ['data \'field\' \'myVal\'']
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n        ']
        },
        {
            'tokenType': 'start',
            'args': [
                'input',
                true
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['form-control']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'attrStart',
            'args': ['id']
        },
        {
            'tokenType': 'attrValue',
            'args': ['test1']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['id']
        },
        {
            'tokenType': 'attrStart',
            'args': ['type']
        },
        {
            'tokenType': 'attrValue',
            'args': ['text']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['type']
        },
        {
            'tokenType': 'attrStart',
            'args': ['can-value']
        },
        {
            'tokenType': 'attrValue',
            'args': ['myVal']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['can-value']
        },
        {
            'tokenType': 'end',
            'args': [
                'input',
                true
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n        ']
        },
        {
            'tokenType': 'start',
            'args': [
                'span',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['input-group-btn']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'span',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n          ']
        },
        {
            'tokenType': 'close',
            'args': ['span']
        },
        {
            'tokenType': 'start',
            'args': [
                'button',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['type']
        },
        {
            'tokenType': 'attrValue',
            'args': ['button']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['type']
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['btn btn-default']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'attrStart',
            'args': ['can-click']
        },
        {
            'tokenType': 'attrValue',
            'args': ['validateField']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['can-click']
        },
        {
            'tokenType': 'end',
            'args': [
                'button',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['Validate']
        },
        {
            'tokenType': 'close',
            'args': ['button']
        },
        {
            'tokenType': 'chars',
            'args': ['\n        ']
        },
        {
            'tokenType': 'chars',
            'args': ['\n      ']
        },
        {
            'tokenType': 'close',
            'args': ['div']
        },
        {
            'tokenType': 'chars',
            'args': ['\n      ']
        },
        {
            'tokenType': 'start',
            'args': [
                'label',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['for']
        },
        {
            'tokenType': 'attrValue',
            'args': ['test2']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['for']
        },
        {
            'tokenType': 'end',
            'args': [
                'label',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['MyNum ']
        },
        {
            'tokenType': 'start',
            'args': [
                'span',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['text-danger']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'span',
                false
            ]
        },
        {
            'tokenType': 'close',
            'args': ['span']
        },
        {
            'tokenType': 'close',
            'args': ['label']
        },
        {
            'tokenType': 'chars',
            'args': ['\n      ']
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['input-group']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'special',
            'args': ['data \'field\' \'myNum\'']
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n        ']
        },
        {
            'tokenType': 'start',
            'args': [
                'input',
                true
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['form-control']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'attrStart',
            'args': ['id']
        },
        {
            'tokenType': 'attrValue',
            'args': ['test2']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['id']
        },
        {
            'tokenType': 'attrStart',
            'args': ['type']
        },
        {
            'tokenType': 'attrValue',
            'args': ['text']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['type']
        },
        {
            'tokenType': 'attrStart',
            'args': ['can-value']
        },
        {
            'tokenType': 'attrValue',
            'args': ['myNum']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['can-value']
        },
        {
            'tokenType': 'end',
            'args': [
                'input',
                true
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n        ']
        },
        {
            'tokenType': 'start',
            'args': [
                'span',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['input-group-btn']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'span',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['\n          ']
        },
        {
            'tokenType': 'close',
            'args': ['span']
        },
        {
            'tokenType': 'start',
            'args': [
                'button',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['type']
        },
        {
            'tokenType': 'attrValue',
            'args': ['button']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['type']
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['btn btn-default']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'attrStart',
            'args': ['can-click']
        },
        {
            'tokenType': 'attrValue',
            'args': ['validateField']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['can-click']
        },
        {
            'tokenType': 'end',
            'args': [
                'button',
                false
            ]
        },
        {
            'tokenType': 'chars',
            'args': ['Validate']
        },
        {
            'tokenType': 'close',
            'args': ['button']
        },
        {
            'tokenType': 'chars',
            'args': ['\n        ']
        },
        {
            'tokenType': 'chars',
            'args': ['\n      ']
        },
        {
            'tokenType': 'close',
            'args': ['div']
        },
        {
            'tokenType': 'chars',
            'args': ['\n    ']
        },
        {
            'tokenType': 'close',
            'args': ['form']
        },
        {
            'tokenType': 'chars',
            'args': ['\n  ']
        },
        {
            'tokenType': 'close',
            'args': ['div']
        },
        {
            'tokenType': 'chars',
            'args': ['\n']
        },
        {
            'tokenType': 'close',
            'args': ['div']
        },
        {
            'tokenType': 'chars',
            'args': ['\n']
        },
        {
            'tokenType': 'done',
            'args': []
        }
    ]));
});
//# sourceMappingURL=can-validate@0can-validate@0.0.5#stache.js.js.map