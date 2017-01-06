var Validate = require('can-validate');
var QUnit = require('steal-qunit');
var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');

var validate;

QUnit.module('Map Validate Plugin', {
	setup: function(){
		validate = new Validate();
	}
});

QUnit.test('sets empty objects',function(){
	QUnit.ok(isEmptyObject(validate.validations));
    QUnit.ok(isEmptyObject(validate.library));
});

QUnit.test('set library for validations',function(){
    var shim = {
        test: function () {
            return;
        }
    };
	QUnit.ok(validate.registerLibrary('test', shim));
    QUnit.ok(validate.library.name === 'test');
});

QUnit.test('set validator for validations',function(){
    var noop = function () {
        return;
    };
    validate.registerValidator('test', noop);
    QUnit.ok(validate.validations.test === noop);
});


QUnit.test('when testing a value for validity',function(){
    var requiredMessage = 'is required';
    var requiredValidator = function (val, isRequired) {
      if ((typeof val === 'undefined' || val === '') && isRequired) {
        return requiredMessage;
      }
    };
    validate.registerValidator('required', requiredValidator);

    var isValid = validate.test('', {required: true});
    var errors = validate.errors();

    QUnit.equal(isValid, false);
	QUnit.equal(isEmptyObject(errors), false);
    QUnit.equal(errors[0].error, requiredMessage);
});
