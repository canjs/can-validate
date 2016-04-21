/* jshint asi: false */
import can from 'can';
import 'can-validate/map/validate/validate';
import 'steal-qunit';

var ValidatedMap = can.Map.extend({
	define: {
		myNumber: {
			value: 'test',
			validate: {
				required: true,
				numericality: true,
				validateOnInit: true
			}
		},
		myString: {
			value: '12345',
			validate: {
				required: true,
				length: 2
			}
		},
		keyPrependedToMessage: {
			value: 'a',
			validate: {
				presence: {
					message: 'is required'
				}
			}
		},
		keyNotPrependedToMessage: {
			value: 'a',
			validate: {
				presence: {
					message: '^My Custom Message'
				}
			}
		}
	}
});

var test = new ValidatedMap({});

test('validate on init', function () {
	equal(test.errors.myNumber.length, 1, 'Validate ran successfully on init.');
});

test('validate', function () {
	equal(test.errors.myString, undefined, 'Does not validate on init by default.');
	test.attr('myString', 'a');
	equal(test.errors.myString.length, 1, 'Validate ran successfully on change of value.');
});

test('validate key prepended to message', function () {
	test.attr('keyPrependedToMessage', '');
	equal(test.errors.myString, 'Key prepended to message is required', 'Validate successfully converted and prepended the key.');
});

test('validate key not prepended to message', function () {
	test.attr('keyPrependedToMessage', '');
	equal(test.errors.myString, 'My Custom Message', 'Validate successfully allowed custom message.');
});
