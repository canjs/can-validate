/* jshint asi: false */
import canMap from 'can-map';
import 'can-validate/map/validate/validate';
import 'steal-qunit';

var ValidatedMap = canMap.extend({
	define: {
		myNumber: {
			value: 100,
			validate: {
				presence: true
			}
		}
	}
});

var test = new ValidatedMap();

test.attr('myNumber', null);
