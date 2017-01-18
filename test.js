var formatErrors = require('can-validate/format-errors/');
var QUnit = require('steal-qunit');
var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');

var requireString = 'is required';
var numberString = 'must be a number';
var errorObject = [numberString, {message: requireString, related: ['name']}, [requireString, {message: numberString, related: ['name']}]];

QUnit.module('can-validate utilities');

QUnit.test('formatErrors normalizes different error types', function () {
    var errors = formatErrors(errorObject);
    QUnit.ok(errors);
    QUnit.equal(errors.length, 4);
    QUnit.equal(errors[0].message, numberString);
});

QUnit.test('formatErrors to flat',function(){
    var errors = formatErrors(errorObject, 'flat');
    QUnit.equal(errors.length, 4);
	QUnit.equal(errors[0], numberString);
});

QUnit.test('formatErrors to object',function(){
    var errors = formatErrors(errorObject, 'object');
    QUnit.ok(errors.name);
    QUnit.equal(errors.name.length, 2);
	QUnit.equal(errors.name[0], requireString);
});

QUnit.test('formatErrors to errors',function(){
    var errors = formatErrors(errorObject, 'errors');
    QUnit.equal(errors.length, 4);
	QUnit.ok(errors[0].message);
	QUnit.equal(errors[0].message, numberString);
});
