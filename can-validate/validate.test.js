/* jshint asi: false */
import can from 'can';
import 'validate.js';
import 'can-validate/shims/validatejs.shim';
import 'can-validate/can-validate';
import 'steal-qunit';

var testValues = {
	stringTest: 'heyo',
	numberTest: 10,
	nullTest: null
};

var testOptions = {
	stringTest: {
		length: {
			is: 4
		}
	},
	numberTest: {
		numercality: true
	}
}

test('once', function () {
	var errors = can.validate.once(testValues.stringTest, testOptions.stringTest);
	equal(errors,undefined, 'Validate ran successfully.');

	var errors = can.validate.once('test', 'a', testOptions.stringTest);
	equal(errors[0], 'Test is the wrong length (should be 4 characters)', 'Validate ran successfully.');
});

test('validate', function () {
	var errors = can.validate.validate(testValues, testOptions);
	equal(errors, undefined, 'Validate ran successfully.');

});
