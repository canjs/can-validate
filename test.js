var formatErrors = require('can-validate/format-errors/');
var QUnit = require('steal-qunit');
var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');

var errorString = 'is required';
var errorObject = [{message: errorString, related: ['name']}];

QUnit.module('can-validate utilities');

QUnit.test('formatErrors defaults to list and map resonse', function () {
    var errors = formatErrors(errorObject);
    QUnit.ok(errors.map);
    QUnit.ok(errors.list);
    QUnit.ok(errors.map.name);
    QUnit.equal(errors.map.name.length, 1);
    QUnit.equal(errors.list.length, 1);
});

QUnit.test('formatErrors to flat',function(){
    var errors = formatErrors(errorObject, 'flat');
    QUnit.equal(errors.length, 1);
	QUnit.equal(errors[0], errorString);
});

QUnit.test('formatErrors to object',function(){
    var errors = formatErrors(errorObject, 'object');
    QUnit.ok(errors.name);
    QUnit.equal(errors.name.length, 1);
	QUnit.equal(errors.name[0], errorString);
});

QUnit.test('formatErrors to errors',function(){
    var errors = formatErrors(errorObject, 'errors');
    QUnit.equal(errors.length, 1);
	QUnit.ok(errors[0].message);
	QUnit.equal(errors[0].message, errorString);
});
