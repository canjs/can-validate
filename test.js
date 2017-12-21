var validate = require('can-validate');
var QUnit = require('steal-qunit');

var requireString = 'is required';
var numberString = 'must be a number';
var errorObject = [numberString, {message: requireString, related: ['name']}, [requireString, {message: numberString, related: ['name']}]];

QUnit.module('can-validate utilities');

QUnit.test('fomarErrors does not throw with undefined', function(assert) {
  assert.deepEqual(validate.formatErrors(undefined), []);
});

QUnit.test('formatErrors to errors', function () {
	var errors = validate.formatErrors(errorObject);
	var expectedErrors = [
		{
			message: "must be a number",
			related: ["*"]
		}, {
			message: "is required",
			related: ["name"]
		}, {
			message: "is required",
			related: ["*"]
		}, {
			"message": "must be a number",
			related: ["name"]
		}
	];
	QUnit.deepEqual(errors, expectedErrors, 'errors object is converted to array of error types');
});

QUnit.test('formatErrors to flat',function(){
	var errors = validate.formatErrors(errorObject, 'flat');
	var expectedErrors = [
		"must be a number",
		"is required",
		"is required",
		"must be a number"
	];
	QUnit.deepEqual(errors, expectedErrors, 'Converts errors to a list of strings');
});

QUnit.test('formatErrors to object',function(){
	var errors = validate.formatErrors(errorObject, 'object');
	var expectedErrors = {
		"*": ["must be a number", "is required"],
		"name": ["is required", "must be a number"]
	};
	QUnit.deepEqual(errors, expectedErrors, 'converts errors to object of strings');
});
